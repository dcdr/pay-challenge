import { UUID } from 'angular2-uuid';
import { Paycheck } from './paycheck.model';

export class Person {
  familyName: string;
  givenName: string;

  constructor(givenName: string, familyName: string) {
    this.givenName = givenName;
    this.familyName = familyName;
  }

  fullname(): string {
    return `${this.familyName}, ${this.givenName}`;
  }
}

export class Dependent extends Person {
  constructor(givenName: string, familyName: string) {
    super(givenName, familyName);
  }

  static fromJson(json: any): Dependent {
    return new Dependent(json.givenName, json.familyName);
  }
}

export class Employee extends Person {
  _id: UUID;
  dependents: Dependent[];
  paycheck: Paycheck;
  
  constructor(id: UUID, givenName: string, familyName: string, dependents: Dependent[]) {
    super(givenName, familyName);
    this._id = id;
    this.dependents = dependents;
  }

  addDependent(dependent: Dependent) {
    this.dependents.push(dependent);
  }

  static fromJson(json: any): Employee {
    let dependents = json.dependents.map(d => { return Dependent.fromJson(d);});
    return new Employee(json._id, json.givenName, json.familyName, dependents);
  }
}