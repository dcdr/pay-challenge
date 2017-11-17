import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { RouterStub } from '../../../testing/router-stubs';
import { EmployeeModule } from '../employee.module';
import { Employee } from '../../models';
import { DependentListComponent } from './dependent-list.component';

import { dataset } from '../../../testing/dataset';

describe('DependentListComponent', () => {
  let component: DependentListComponent;
  let fixture: ComponentFixture<DependentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        EmployeeModule
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentListComponent);
    component = fixture.componentInstance;
    component.employee = Employee.fromJson(dataset.employees[0]);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
