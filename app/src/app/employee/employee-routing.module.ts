import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [{
  path: 'employees',
  component: EmployeeListComponent
}, {
  path: 'employee/new',
  component: EmployeeEditComponent
}, {
  path: 'employee/:id',
  component: EmployeeEditComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
