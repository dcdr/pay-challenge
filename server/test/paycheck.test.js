const { Employee, Dependent } = require('../src/services/employees/employees.model');
const { Paycheck } = require('../src/services/employees/paycheck');
const expect = require('expect');

describe('Payroll', () => {
  it('should pay George Jetson $1961.54 when having no dependents', () => {
    let employee = new Employee('George', 'Jetson', []);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1961.54);
  });

  it('should pay George Jetson $1903.85 when having no A dependents', () => {
    let employee = new Employee('George', 'Jetson', [
      new Dependent('Jane', 'Jetson'),
      new Dependent('Judy', 'Jetson'),
      new Dependent('Elroy', 'Jetson')
    ]);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1903.85);
  });

  it('should pay George Jetson $1886.54 when having an A dependent', () => {
    let employee = new Employee('George', 'Jetson', [
      new Dependent('Jane', 'Jetson'),
      new Dependent('Judy', 'Jetson'),
      new Dependent('Elroy', 'Jetson'),
      new Dependent('Astro', 'Jetson')
    ]);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1886.54);
  });

  it('should pay Andy Murray $1965.38 when having no dependents', () => {
    let employee = new Employee('Andy', 'Murray', []);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1965.38);
  });

  it('should pay Andy Murray $1946.15 when having no A dependents', () => {
    let employee = new Employee('Andy', 'Murray', [
      new Dependent('Kim', 'Sears'),
    ]);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1946.15);
  });

  it('should pay Andy Murray $1928.85 when having an A dependent', () => {
    let employee = new Employee('Andy', 'Murray', [
      new Dependent('Kim', 'Sears'),
      new Dependent('Andy Jr.', 'Murray')
    ]);
    let paycheck = new Paycheck(employee);
    expect(paycheck.total).toBe(1928.85);
  });
});