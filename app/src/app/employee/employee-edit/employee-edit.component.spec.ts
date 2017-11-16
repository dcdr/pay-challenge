import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'ng2-materialize';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UUID } from 'angular2-uuid';

import { RouterStub, ActivatedRouteStub } from '../../../testing/router-stubs';
import { PaylocityApi } from '../../services';

import { EmployeeEditComponent } from './employee-edit.component';
import { Employee } from '../../models';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
  let apiSpy: jasmine.Spy;
  let activatedRoute = new ActivatedRouteStub();
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterializeModule
      ],
      declarations: [
        EmployeeEditComponent
      ],
      providers: [
        PaylocityApi,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testParams = { id: null };
    
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    let api = fixture.debugElement.injector.get(PaylocityApi);
    let employee = new Employee(UUID.UUID(), 'This', 'Person');
    apiSpy = spyOn(api, 'getEmployee')
      .and.returnValue(Observable.of(employee));

      fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
