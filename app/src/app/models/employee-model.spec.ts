import { UUID } from 'angular2-uuid';
import { Employee, Dependent, Person } from './employee-model';

describe('Employee', () => {
  let employee = new Employee(UUID.UUID(), 'test', 'subject', []);
  
  it('should generate full name', () => {
    expect(employee.fullname()).toBe('subject, test');
  });

  it('should set dependent count when setting dependents', () => {
    let dependents = [ new Dependent(null, employee.id, 'tommy', 'subject') ];
    employee.dependents = dependents;
    expect(employee.dependentCount).toBe(dependents.length);
  });

  it('should add dependent and update count', () => {
    let newDependent = new Dependent(null, null, 'susy', 'subject');
    const originalDependentCount = employee.dependentCount;
    employee.addDependent(newDependent);

    expect(employee.dependentCount).toBe(originalDependentCount + 1);
    let dependent = employee.dependents.find(d => d.givenName === newDependent.givenName && d.familyName === newDependent.familyName);
    expect(dependent).toBeDefined();
  });
});