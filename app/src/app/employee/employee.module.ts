import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeModule } from 'ng2-materialize';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeeListComponent
  ],
  exports: [
    EmployeeListComponent
  ]
})
export class EmployeeModule { }
