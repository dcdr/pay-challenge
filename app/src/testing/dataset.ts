import { UUID } from 'angular2-uuid';

export const dataset = {
  employees: [ 
    {
      id: UUID.UUID(),
      givenName: 'Ben',
      familyName: 'Bernanke',
      dependents: [{
        id: UUID.UUID(),
        givenName: 'Anna',
        familyName: 'Friedmann'
      }]
    },
    {
      id: UUID.UUID(),
      givenName: 'Jerome',
      familyName: 'Powell',
      dependents: [{
        id: UUID.UUID(),
        givenName: 'Elissa',
        familyName: 'Leonard'
      },
      {
        id: UUID.UUID(),
        givenName: 'Lucy',
        familyName: 'Powell'
      },
      {
        id: UUID.UUID(),
        givenName: 'Susie',
        familyName: 'Powell'
      },
      {
        id: UUID.UUID(),
        givenName: 'Sam',
        familyName: 'Powell'
      }]
    },
    {
      id: UUID.UUID(),
      givenName: 'Janet',
      familyName: 'Yellon',
      dependents: [{
        id: UUID.UUID(),
        givenName: 'George',
        familyName: 'Akerlof'
      },
      {
        id: UUID.UUID(),
        givenName: 'Robert',
        familyName: 'Akerlof'
      }]
    }
  ],
};
