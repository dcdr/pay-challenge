import { UUID } from 'angular2-uuid';
import { Employee, Dependent, Person } from './employee.model';

describe('Employee', () => {
  let employee = new Employee(UUID.UUID(), 'test', 'subject', []);
  
  it('should generate full name', () => {
    expect(employee.fullname()).toBe('subject, test');
  });

  it('should add dependent and update count', () => {
    let newDependent = new Dependent('susy', 'subject');
    const originalDependentCount = employee.dependents.length;
    employee.addDependent(newDependent);

    expect(employee.dependents.length).toBe(originalDependentCount + 1);
    let dependent = employee.dependents.find(d => d.givenName === newDependent.givenName && d.familyName === newDependent.familyName);
    expect(dependent).toBeDefined();
  });
});