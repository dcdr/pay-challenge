import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { PChallengeApi } from '../../services';

import { Employee } from '../../models';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ['']
})
export class EmployeeListComponent implements OnInit {
  employees: Array<Employee>;

  constructor(private api: PChallengeApi, private router: Router) {
  }

  ngOnInit() {
    this.api.getEmployees().toArray().subscribe(all => { 
      this.employees = all; 
    }); 
  }

  hasDependents(employee: Employee) {
    return employee.dependents && employee.dependents.length > 0;
  }

  onClick(employee: Employee) {
    this.router.navigate(['employee', employee._id]);
  }

  onDelete(employee: Employee) {
    this.api.removeEmployee(employee);
    this.api.getEmployees().toArray().subscribe(all => { 
      this.employees = all; 
    }); 
  }
}
