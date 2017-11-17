import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { Employee } from '../models';

// This class is used to explore the needs of the API. It will be replaced
// with an actual implementation of the API when its shape is more clear.
export class PaylocityApi {

  // Simulate the retrieval of all employees. The over-the-wire representation
  // is often a summary (e.g. dependent count vs. full dependent info).
  // GET /api/v1/employees
  // Query parameters might come later.
  getEmployees(): Observable<Employee> {
    const data = this.getData();
    let employees = new Array<Employee>();

    return new Observable<Employee>(subscribe => {
      data.employees.forEach(emp => {
        let employee = new Employee(emp.id, emp.givenName, emp.familyName, []);
        let dependents = data.dependents.filter(d => d.employeeId === employee.id);
        employee.dependentCount = dependents.length;
        subscribe.next(employee);
      })
      subscribe.complete();
    })
  }

  // Simulate retrieval of a specific employee record.
  // GET /api/v2/employee/{id}
  getEmployee(id: UUID): Observable<Employee> {
    const data = this.getData();
    let empData = data.employees.find(e => e.id === id);
    let dependents = data.dependents.filter(d => d.employeeId === empData.id);
    let employee = new Employee(empData.id, empData.givenName, empData.familyName, dependents);
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
    if (employee.dependents && employee.dependents.length > 0) {
      employee.dependents.forEach(dep => {
        if (!dep.id) {
          dep.id = UUID.UUID();
          data.dependents.push(dep);
        }
        else {
          let index = data.dependents.findIndex(d => d.id === dep.id);
          if (index !== -1) {
            data.dependents[index] = dep;
          }
        }
      });
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
    const bernakeId = UUID.UUID();
    const powellId = UUID.UUID();
    const yellonId = UUID.UUID();
    return {
      employees: [ 
        { id: bernakeId, givenName: 'Ben', familyName: 'Bernanke' },
        { id: powellId, givenName: 'Jerome', familyName: 'Powell' },
        { id: yellonId, givenName: 'Janet', familyName: 'Yellon' }
      ],
      dependents: [
        { id: UUID.UUID(), employeeId: yellonId, givenName: 'George', familyName: 'Akerlof' },
        { id: UUID.UUID(), employeeId: yellonId, givenName: 'Robert', familyName: 'Akerlof' },
        { id: UUID.UUID(), employeeId: bernakeId, givenName: 'Anna', familyName: 'Friedmann' },
        { id: UUID.UUID(), employeeId: powellId, givenName: 'Elissa', familyName: 'Leonard' },
        { id: UUID.UUID(), employeeId: powellId, givenName: 'Lucy', familyName: 'Powell' },
        { id: UUID.UUID(), employeeId: powellId, givenName: 'Susie', familyName: 'Powell' },
        { id: UUID.UUID(), employeeId: powellId, givenName: 'Sam', familyName: 'Powell' },
      ]
    };
  }
}