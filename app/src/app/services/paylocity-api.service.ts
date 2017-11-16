import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { Employee } from '../models';

// This class is used to explore the needs of the API. It will be replaced
// with an actual implementation of the API when its shape is more clear.
export class PaylocityApi {

  // Simulate the retrieval of data over-the-wire and converting it into
  // an Employee domain model. 
  // GET /api/v1/employees
  // Query parameters might come later.
  getEmployees(): Observable<Employee> {
    let employeeData = this.getData().employees;
    let employees = new Array<Employee>();

    return new Observable<Employee>(subscribe => {
      employeeData.forEach(data => {
        let employee = new Employee(data.id, data.givenName, data.familyName);
        subscribe.next(employee);
      })
      subscribe.complete();
    })
  }

  // Simulate retrieval of a specific employee record.
  // GET /api/v2/employee/{id}
  getEmployee(id: UUID): Observable<Employee> {
    let employeeData = this.getData().employees;
    let data = employeeData.find(e => e.id === id);
    let employee = new Employee(data.id, data.givenName, data.familyName);
    return Observable.of(employee);
  }

  // Simulate saving an employee record. 
  // POST /api/v2/employees to create record if id is undefined.
  // PUT /api/v2/employee/{id} to update the record.
  // Might require semantics where the id of a newly created employee is returned.
  saveEmployee(employee: Employee) {
    let data = this.getData();
    if (!employee.id) {
      employee.id = UUID.UUID();
      data.employees.push(employee);
    }
    else {
      let index = data.employees.findIndex(e => e.id === employee.id);
      if (index !== -1) {
        data.employees[index] = employee;
      }
    }
    this.saveData(data);
  }

  private getData() {
    let json = JSON.parse(localStorage.getItem('paylocity-challenge'));
    if (!json) {
      json = this.initialData();
      this.saveData(json);
    }
    return json;
  }

  private saveData(json: any) {
    localStorage.setItem('paylocity-challenge', JSON.stringify(json));
  }

  private initialData() {
    return {
      employees: [ 
        { id: UUID.UUID(), givenName: 'Ben', familyName: 'Bernanke' },
        { id: UUID.UUID(), givenName: 'Jerome', familyName: 'Powell' },
        { id: UUID.UUID(), givenName: 'Janet', familyName: 'Yellon' }
      ]
    };
  }
}