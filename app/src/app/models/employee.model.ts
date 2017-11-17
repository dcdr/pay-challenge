import { UUID } from 'angular2-uuid';
import { Paycheck } from './paycheck.model';

export class Person {
  id: UUID;
  familyName: string;
  givenName: string;

  constructor(id: UUID, givenName: string, familyName: string) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
  }

  fullname(): string {
    return `${this.familyName}, ${this.givenName}`;
  }
}

export class Dependent extends Person {
  constructor(id: UUID, givenName: string, familyName: string) {
    super(id, givenName, familyName);
  }

  static fromJson(json: any): Dependent {
    return new Dependent(json.id, json.givenName, json.familyName);
  }
}

export class Employee extends Person {
  dependents: Dependent[];
  paycheck: Paycheck;
  
  constructor(id: UUID, givenName: string, familyName: string, dependents: Dependent[]) {
    super(id, givenName, familyName);
    this.dependents = dependents;
  }

  addDependent(dependent: Dependent) {
    this.dependents.push(dependent);
  }

  static fromJson(json: any): Employee {
    let dependents = json.dependents.map(d => { return Dependent.fromJson(d);});
    return new Employee(json.id, json.givenName, json.familyName, dependents);
  }
}