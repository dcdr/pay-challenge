import { UUID } from 'angular2-uuid';

export class Person {
  id: UUID;
  familyName: string;
  givenName: string;

  constructor(id: UUID, givenName: string, familyName: string) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
  }
}

export class Dependent extends Person {
  employeeId: UUID;

  constructor(id: UUID, employeeId: UUID, givenName: string, familyName: string) {
    super(id, givenName, familyName);
    this.employeeId = employeeId;
  }
}

export class Employee extends Person {
  dependentCount: number;
  private _dependents: Dependent[];

  constructor(id: UUID, givenName: string, familyName: string, dependents: Dependent[]) {
    super(id, givenName, familyName);
    this.dependents = dependents;
  }

  fullname() {
    return `${this.familyName}, ${this.givenName}`;
  }

  get dependents(): Dependent[] {
    return this._dependents;
  }

  set dependents(dependents: Dependent[]) {
    this._dependents = dependents;
    this.dependentCount = !!dependents ? dependents.length : 0;
  }

  addDependent(dependent: Dependent) {
    dependent.employeeId = this.id;
    this._dependents.push(dependent);
    this.dependentCount++;
  }

  toJSON() {
    return { id: this.id, familyName: this.familyName, givenName: this.givenName };
  }
}