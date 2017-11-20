'use strict';

const { discard } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ discard('_id') ],
    update: [ discard('_id') ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [findPaychecksHook],
    get: [getPaycheckHook],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

function findPaychecksHook(context) {
  context.result.data.forEach(employee => {
    employee.paycheck = new Paycheck(employee);
  })
  return context;
}

function getPaycheckHook(context) {
  context.result.paycheck = new Paycheck(context.result);
  return context;
}

class Paycheck {
  constructor(employee) {
    const employeePayPeriodsPerYear = PaySchedule.payPeriodsPerYear(employee);
    this.income = [ 
      // salary
      this.round(Salary.perYear(employee) / employeePayPeriodsPerYear)
      // bonuses, etc.
    ];
    this.deductions = [
      // cost of benefits
      this.round(Benefit.costPerYear(employee) / employeePayPeriodsPerYear)
      // social security and other taxes
      // advances, etc.
    ]
  }
  
  round(value) {
    return Math.round(value * 100.0) / 100.0;
  }
}

// These classes are expected to be implemented on the backend. Many are tables
// in the DB.

class PaySchedule {
  // The various employee job classifications could have different pay periods.
  static payPeriodsPerYear(employee) {
    return 26;
  }
}

class Benefit {
  static costPerYear(employee) {
    let employeeCost = 1000;
    let dependentCost = 500;
      // Discounts applicable to this benefit.
    let cost = 0;

    // Compute the NameBeginsWith 'A' discount for the employee and dependents
    cost += employeeCost - new NameBeginsWith(employee, 'A').calculate(employeeCost);
    employee.dependents.forEach(d => { 
      cost += dependentCost - new NameBeginsWith(d, 'A').calculate(dependentCost);
    });

    // Apply the discount before returning cost.
    return cost;
  }
}

// Implement the interface and introduce the parameters needed for
// the calculation.
class NameBeginsWith {
  constructor(person, prefix) {
    this.person = person;
    this.prefix = prefix;
  }

  calculate(value) {
    let discount = 0.0;
    if (this.person.givenName.startsWith(this.prefix)) {
      discount = 0.1;
    }
    return discount * value;
  }
}

class Salary {
  static perYear(employee) {
    return 2000.0 * 26;
  }
}