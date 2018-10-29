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
  getProds,
  getOneProd,
  putOneProd,
  delOneProd
} = require('../products');

describe('Model - Products:', () => {
  beforeAll(async () => {
    // Use test DB instead of dev
    const test_db = knex(knexConfig.test);
    // Migrate to our test DB in memory
    await test_db.migrate.latest()
      .catch((err) => { throw err; });
    // Mock db call in file
    db.mockImplementation((table) => {
      return test_db(table);
    });

  });

  afterEach(async () => {
    await db('products').del()
      .catch((err) => { throw err; });
  });

  it('Tests are testing', () => {
    // Sanity testing. Can't test if tests don't test
    expect('abc').toBe('abc');
    expect(true).toBeTruthy();
  });

  it('Returns empty array when DB is empty.', async () => {
    // Act
    const result = await getProds()
      .catch((err) => { throw err; });
    // Assert
    expect(result).toEqual([]);
  });

  it('Inserts and retrieves record successfully.', async () => {
    // --- Insert Record
    // Arrange
    const name = "Testing Product";
    const description = "I love tests!";
    const price = 3.50;
    // Act
    const postResult = await newProd(name, description, price)
      .catch((err) => { throw err; });
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

  it('Retrieves one product record successfully.', async () => {
    // Arrange
    const records = [
      {
        name: 'Test1',
        description: 'test',
        price: 1
      },
      {
        name: 'Test2',
        description: 'tests',
        price: 2
      },
      {
        name: 'Test3',
        description: 'testss',
        price: 5
      },
    ];

    // Act
    let result1,
        result2;
    try {
      for (const prod of records) {
        const { name, description, price } = prod;
        const [ id ] = await newProd(name, description, price);
        prod.id = id;
      }

      result1 = await getOneProd(records[0].id);
      result2 = await getOneProd(records[2].id);
      result3 = await getOneProd(99);
    } 
    catch (err) {
      throw err;
    }
    // Assert
    expect(result1).toEqual(
      expect.arrayContaining([expect.objectContaining(records[0])])
    );
    expect(result2).toEqual(
      expect.arrayContaining([expect.objectContaining(records[2])])
    );
    expect(result3).toEqual([]);
  });

  it('Updates a record successfully.', async () => {
    // Arrange
    const record = {
      name: 'Test1',
      description: 'test',
      price: 1
    };
    // Act
    let result,
        count;
    try {
      const { name, description, price } = record;
      const [ id ] = await newProd(name, description, price);
      count = await putOneProd(id, name, description, 30);
      result = await getOneProd(id);
    }
    catch (err) {
      throw err;
    }
    // Asset
    expect(count).toBe(1);
    expect(result).not.toEqual(expect.arrayContaining([expect.objectContaining(record)]));
    expect(result).toEqual(
      expect.arrayContaining([ expect.objectContaining({ ...record, price: 30 }) ])
      );
  });

  it('Deletes a record successfully.', async () => {
    // Arrange
    const records = [
      {
        name: 'Test1',
        description: 'test',
        price: 1
      },
      {
        name: 'Test2',
        description: 'tests',
        price: 2
      },
    ];
    // Act
    let result,
        count;
    try {
      for (const prod of records) {
        const { name, description, price } = prod;
        const [ id ] = await newProd(name, description, price);
        prod.id = id;
      }
      count = await delOneProd(records[0].id);
      result1 = await getOneProd(records[0].id);
      result2 = await getOneProd(records[1].id);
    }
    catch (err) {
      throw err;
    }
    // Asset
    expect(count).toBe(1);
    expect(result1).not.toEqual(expect.arrayContaining([expect.objectContaining(records[0])]));
    expect(result1).toEqual([]);
    expect(result2).toEqual(expect.arrayContaining([expect.objectContaining(records[1])]));
  });
});