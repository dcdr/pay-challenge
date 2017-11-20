class Person {
  constructor(givenName, familyName) {
    this.givenName = givenName;
    this.familyName = familyName;
  }
}

class Dependent extends Person {
  constructor(givenName, familyName) {
    super(givenName, familyName);
  }  
}

class Employee extends Person {
  constructor(givenName, familyName, dependents) {
    super(givenName, familyName);
    this.dependents = dependents;
  }
}

module.exports = {
  Dependent,
  Employee
};