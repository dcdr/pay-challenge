const employees = require('./employees/employees.service.js');

module.exports = function (app) { // eslint-disable-line no-unused-vars
  app.configure(employees);
};
