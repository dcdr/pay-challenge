import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'ng2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaylocityApi } from './services';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule.forRoot(),
    AppRoutingModule,
    EmployeeModule
  ],
  providers: [
    PaylocityApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
