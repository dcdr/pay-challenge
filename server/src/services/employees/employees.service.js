// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb');
const createModel = require('./employees.model');
const hooks = require('./employees.hooks');
// const filters = require('./employees.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'employees',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('api/v1/employees', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/employees');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  // Seed the DB
  service.find().then(existing => {
    console.log('existing: ', existing);
    if (!existing || existing.data.length ===0) {
      console.log('seeding db');
      Promise.all([
        service.create({
          givenName: 'Ben',
          familyName: 'Bernanke',
          dependents: [{
            givenName: 'Anna',
            familyName: 'Friedmann'
          }]
        }),
        service.create({
          givenName: 'Jerome',
          familyName: 'Powell',
          dependents: [{
            givenName: 'Elissa',
            familyName: 'Leonard'
          },
          {
            givenName: 'Lucy',
            familyName: 'Powell'
          },
          {
            givenName: 'Susie',
            familyName: 'Powell'
          },
          {
            givenName: 'Sam',
            familyName: 'Powell'
          }]
        }),
        service.create({
          givenName: 'Janet',
          familyName: 'Yellon',
          dependents: [{
            givenName: 'George',
            familyName: 'Akerlof'
          },
          {
            givenName: 'Robert',
            familyName: 'Akerlof'
          }]
        })
      ]);
    }
  });
};
