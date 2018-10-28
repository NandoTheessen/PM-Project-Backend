const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.test);


describe('Model - Products:', () => {
  it('Tests are testing', () => {
    // Sanity testing. Can't test if tests don't test
    expect('abc').toBe('abc');
    expect(true).toBeTruthy();
  });
})