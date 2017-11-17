import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

import { PaylocityApi } from '../../services';
import { EmployeeModule } from '../employee.module';
import { EmployeeListComponent } from './employee-list.component';
import { Employee } from '../../models';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let apiSpy: jasmine.Spy;

  let employees = [
    new Employee(UUID.UUID(), 'Ben', 'Bernanke', []),
    new Employee(UUID.UUID(), 'Jerome', 'Powell', []),
    new Employee(UUID.UUID(), 'Janet', 'Yellon', [])
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        EmployeeModule,
        RouterTestingModule
      ],
      providers: [
        PaylocityApi
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    let api = fixture.debugElement.injector.get(PaylocityApi);
    apiSpy = spyOn(api, 'getEmployees')
      .and.returnValue(Observable.from(employees));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render each employee', () => {
    const cards = fixture.debugElement.queryAll(By.css('mz-card'));
    expect(cards.length).toBe(component.employees.length);
    cards.forEach((card) => {
      const content = card.query(By.css('.employee-name'));
      expect(component.employees.some((employee: Employee) => {
        return content.nativeElement.innerText === `${employee.fullname()}`;
      })).toBeTruthy();
    });
  });

  it('should retrieve current employees from service', () => {
    expect(apiSpy).toHaveBeenCalled();
  });
});
