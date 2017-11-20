import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MaterializeModule } from 'ng2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PChallengeApi } from './services';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterializeModule.forRoot(),
    EmployeeModule,
    AppRoutingModule,
  ],
  providers: [
    HttpClient,
    PChallengeApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
