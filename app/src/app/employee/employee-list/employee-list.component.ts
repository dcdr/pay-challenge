import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { PaylocityApi } from '../../services';

import { Employee } from '../../models';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: ['']
})
export class EmployeeListComponent implements OnInit {
  employees: Array<Employee>;

  constructor(private api: PaylocityApi, private router: Router) {
  }

  ngOnInit() {
    this.api.getEmployees().toArray().subscribe(all => { 
      this.employees = all; 
    }); 
  }

  onClick(employee: Employee) {
    this.router.navigate(['employee', employee.id]);
  }
}
