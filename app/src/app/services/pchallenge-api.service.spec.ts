import { PChallengeApi } from './pchallenge-api.service';
import { Employee, Dependent, Paycheck } from '../models';

describe('Payroll', () => {
  let api: PChallengeApi;

  beforeAll(()=> {
    api = new PChallengeApi();
  });

  it('should pay George Jetson $1961.54 when having no dependents', () => {
    let employee = new Employee(null, 'George', 'Jetson', []);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1961.54);
    });
  });

  it('should pay George Jetson $1903.85 when having no A dependents', () => {
    let employee = new Employee(null, 'George', 'Jetson', [
      new Dependent(null, 'Jane', 'Jetson'),
      new Dependent(null, 'Judy', 'Jetson'),
      new Dependent(null, 'Elroy', 'Jetson')
    ]);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1903.85);
    });
  });

  it('should pay George Jetson $1886.54 when having an A dependent', () => {
    let employee = new Employee(null, 'George', 'Jetson', [
      new Dependent(null, 'Jane', 'Jetson'),
      new Dependent(null, 'Judy', 'Jetson'),
      new Dependent(null, 'Elroy', 'Jetson'),
      new Dependent(null, 'Astro', 'Jetson')
    ]);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1886.54);
    });
  });

  it('should pay Andy Murray $1965.38 when having no dependents', () => {
    let employee = new Employee(null, 'Andy', 'Murray', []);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1965.38);
    });
  });

  it('should pay Andy Murray $1946.15 when having no A dependents', () => {
    let employee = new Employee(null, 'Andy', 'Murray', [
      new Dependent(null, 'Kim', 'Sears'),
    ]);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1946.15);
    });
  });

  it('should pay Andy Murray $1928.85 when having an A dependent', () => {
    let employee = new Employee(null, 'Andy', 'Murray', [
      new Dependent(null, 'Kim', 'Sears'),
      new Dependent(null, 'Andy Jr.', 'Murray')
    ]);
    api.getPayCheck(employee).subscribe(paycheck => {
      expect(paycheck.total).toBe(1928.85);
    });
  });
});