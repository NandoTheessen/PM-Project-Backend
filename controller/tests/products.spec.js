const knex = require('knex');
const knexConfig = require('../../knexfile');

jest.mock('../../data/dbConfig');

const db = require('../../data/dbConfig');
const test_db = knex(knexConfig.test);

db.mockImplementation((table) => {
  return test_db(table);
});

const {
  newProd,
  getProds
} = require('../products');

describe('Model - Products:', () => {
  beforeAll(async () => {
    // Use test DB instead of dev
    const test_db = knex(knexConfig.test);
    // Migrate to our test DB in memory
    await test_db.migrate.latest();
    // Mock db call in file
    db.mockImplementation((table) => {
      return test_db(table);
    });

  });

  it('Tests are testing', () => {
    // Sanity testing. Can't test if tests don't test
    expect('abc').toBe('abc');
    expect(true).toBeTruthy();
  });

  it('Returns empty array when DB is empty.', async () => {
    // Act
    const result = await getProds();
    // Assert
    expect(result).toEqual([]);
  });

  it('Successfully inserts and retrieves record.', async () => {
    // --- Insert Record
    // Arrange
    const name = "Testing Product";
    const description = "I love tests!";
    const price = 3.50;
    // Act
    const postResult = await newProd(name, description, price);
    // Assert
    expect(postResult).toEqual([ 1 ]);
    // --- Retrieve Record
    // Act
    const getResult = await getProds();
    // Assert
    expect(getResult).toEqual(
      expect.arrayContaining([expect.objectContaining({ name, description, price })])
    );
  });
});