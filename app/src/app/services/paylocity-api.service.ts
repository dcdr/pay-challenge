import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { Employee } from '../models';

// This class is used to explore the needs of the API. It will be replaced
// with an actual implementation of the API when its shape is more clear.
export class PaylocityApi {

  // Simulate the retrieval of data over-the-wire and converting it into
  // an Employee domain model.
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
        { id: new UUID(), givenName: 'Ben', familyName: 'Bernanke' },
        { id: new UUID(), givenName: 'Jerome', familyName: 'Powell' },
        { id: new UUID(), givenName: 'Janet', familyName: 'Yellon' }
      ]
    };
  }
}