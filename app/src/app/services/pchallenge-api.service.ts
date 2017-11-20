import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { Employee, Person, Paycheck, Dependent } from '../models';
import { dataset } from '../../testing/dataset';

// This class is used to explore the needs of the API. It will be replaced
// with an actual implementation of the API when its shape is more clear.
@Injectable()
export class PChallengeApi {
  constructor(private http: HttpClient) {}

  // Retrieval of all employees.
  // GET /employees
  // Query parameters might come later.
  getEmployees(): Observable<Employee> {
    return new Observable<Employee>(subscriber => {
      let headers = new HttpHeaders({'Cache-Control': 'no-cache'});
      this.http.get('http://localhost:3030/api/v1/employees', { headers }).subscribe((response: any) => {
        response.data.forEach(emp => {
          let employee = Employee.fromJson(emp);
          employee.paycheck = this.paycheck(employee);
          subscriber.next(employee);
        });
        subscriber.complete();
      });
    });
  }

  // Simulate retrieval of a specific employee record.
  // GET /api/v1/employee/{id}
  getEmployee(id: UUID): Observable<Employee> {
    return new Observable<Employee>(subscriber => {
      this.http.get(`http://localhost:3030/api/v1/employees/${id}`).subscribe((response: any) => {
        subscriber.next(Employee.fromJson(response));
        subscriber.complete();
      });
    });
  }

  // Simulate saving an employee record. 
  // POST /api/v1/employees to create record if id is undefined.
  // PUT /api/v1/employee/{id} to update the record.
  // Might require semantics where the id of a newly created employee is returned.
  saveEmployee(employee: Employee) {
    if (!employee._id) {
      this.http.post('http://localhost:3030/api/v1/employees', employee).subscribe(response => {
      });
    }
    else {
      this.http.put(`http://localhost:3030/api/v1/employees/${employee._id}`, employee).subscribe(response => {
      });
    }
  }

  // Simulate deleting an employee from the DB.
  // DELETE /api/v1/employee/{id}
  removeEmployee(employee: Employee) {
    this.http.delete(`http://localhost:3030/api/v1/employees/${employee._id}`).subscribe(response => {
    });
  }

  // Simulate retrieving an employee's paycheck.
  // It's seems prudent to keep the business logic and data for
  // this transaction on the backend.
  // GET /api/v1/employee/{id}/paycheck
  // Might take a date or pay period as a query parameter.
  getPayCheck(employee: Employee): Observable<Paycheck> {
    return Observable.of(this.paycheck(employee));
  }

  private paycheck(employee: Employee): Paycheck {    
    const employeePayPeriodsPerYear = PaySchedule.payPeriodsPerYear(employee);
    let income: number[] = [ 
      // salary
      this.round(Salary.perYear(employee) / employeePayPeriodsPerYear)
      // bonuses, etc.
    ];
    let deductions: number[] = [
      // cost of benefits
      this.round(Benefit.costPerYear(employee) / employeePayPeriodsPerYear)
      // social security and other taxes
      // advances, etc.
    ]
    return new Paycheck(income, deductions);
  }

  private round(value: number) {
    return Math.round(value * 100.0) / 100.0;
  }

  private getData() {
    let json = JSON.parse(localStorage.getItem('p-challenge'));
    if (!json) {
      json = this.initialData();
      this.saveData(json);
    }
    return json;
  }

  private saveData(json: any) {
    localStorage.setItem('p-challenge', JSON.stringify(json));
  }

  private initialData() {
    return dataset;
  }
}

// These classes are expected to be implemented on the backend. Many are tables
// in the DB.

class PaySchedule {
  // The various employee job classifications could have different pay periods.
  static payPeriodsPerYear(employee: Employee): number {
    return 26;
  }
}

class Benefit {
  private static employeeCost = 1000;
  private static dependentCost = 500;
  
  static costPerYear(employee: Employee): number {
    // Discounts applicable to this benefit.
    let cost = 0;

    // Compute the NameBeginsWith 'A' discount for the employee and dependents
    cost += Benefit.employeeCost - new NameBeginsWith(employee, 'A').calculate(Benefit.employeeCost);
    employee.dependents.forEach(d => { 
      cost += Benefit.dependentCost - new NameBeginsWith(d, 'A').calculate(Benefit.dependentCost);
    });

    // Apply the discount before returning cost.
    return cost;
  }
}

// Start with a clean interface free of unnecessary parameters such
// as employees.
interface Discount {
  calculate(value: number): number;
}

// Implement the interface and introduce the parameters needed for
// the calculation.
class NameBeginsWith implements Discount {
  private static discount = 0.1;

  constructor(private person: Person, private prefix: string) {
  }

  calculate(value: number): number {
    let discount = 0.0;
    if (this.person.givenName.startsWith(this.prefix)) {
      discount = NameBeginsWith.discount;
    }
    return discount * value;
  }
}

class Salary {
  private static egalitarian_wage = 2000.0 * 26;

  static perYear(employee: Employee): number {
    return Salary.egalitarian_wage;
  }
}