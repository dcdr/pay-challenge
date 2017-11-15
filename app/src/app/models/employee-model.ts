import { UUID } from 'angular2-uuid';

export class Employee {
  id: UUID;
  familyName: string;
  givenName: string;

  constructor(id: UUID, givenName: string, familyName: string) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
  }

  fullname() {
    return `${this.familyName}, ${this.givenName}`;
  }
}