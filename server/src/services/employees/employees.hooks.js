'use strict';

const { discard } = require('feathers-hooks-common');
const { Paycheck } = require('./paycheck');

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
  });
  return context;
}

function getPaycheckHook(context) {
  context.result.paycheck = new Paycheck(context.result);
  return context;
}
