import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeComponent } from './employee.component';
import { DependentListComponent } from './dependent-list/dependent-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    DependentListComponent
  ],
  exports: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    DependentListComponent
  ]
})
export class EmployeeModule { }
