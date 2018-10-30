const status = require('../../utils/httpStatus');

const products = require('../products');

jest.mock('../../controller/index');

const {
  getProds,
  newProd,
  getOneProd,
  putOneProd,
  delOneProd,
} = require('../../controller/index');

describe('Controller - Products:', () => {

  /* Mocking Boilerplate */
  // Variables for mocking insertion
  let id = 0;
  let fakeDb = [];
  // Req, Res, Next mocks
  let request;
  let response;
  // If next is called, we'll capture the error in error var
  let error;
  const next = (err) => {
    error = err;
  };

  beforeAll(() => {
    // For unit/isolated testing,
    // we will mock the DB helper functions
    getProds.mockImplementation(() => {
      return Promise.resolve(fakeDb);
    });

    newProd.mockImplementation((name, description, price) => {
      const newObject = {
        id: id++,
        name,
        description,
        price
      };
      fakeDb.push(newObject);
      return Promise.resolve([newObject.id]);
    });

    getOneProd.mockImplementation((id) => {
      return Promise.resolve(fakeDb.filter((elem) => elem.id === id));
    });

    putOneProd.mockImplementation((id, name, description, price) => {
      const count = fakeDb.reduce((acc, elem) => elem.id === id ? ++acc : acc, 0);
      return count;
    });

    delOneProd.mockImplementation((id) => {
      const count = fakeDb.reduce((acc, elem) => elem.id === id ? ++acc : acc, 0);
      return count;
    });
  });

  beforeEach(() => {
    // Below are mocks for mocking req and res objects
    // They'll be reset before every test
    request = {
      params: {},
      body: {},
    };

    response = {
      // status, json, and send in our fake res object will
      // save anything passed to it in the following vars
      sendCalledWith: '',
      statusCalledWith: '',
      jsonCalledWith: '',
      // we can test by comparing the values above with expected
      status: function(statusCode) {
        this.statusCalledWith = statusCode;
        return this; // this allows chaining
        // e.g. res.status(200).json(result) can be tested
      },
      json: function(obj) {
        this.jsonCalledWith = obj;
      },
      send: function(arg) {
        this.sendCalledWith = arg;
      },
    };

    // Reset helper vars
    id = 0;
    fakeDb = [];
    error = null;
  });
  /* End Boilerplate */

/* Actual Tests */
  it('Tests are testing', () => {
    // Sanity testing. Can't test if tests don't test
    expect('abc').toBe('abc');
    expect(true).toBeTruthy();
  });

  it('getAll sends proper response when DB is empty.', async () => {
    // Act
    await products.getAll(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith, jsonCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.ok);
    expect(jsonCalledWith).toMatchObject([]);
  });

  it('post sends proper response after insertion.', async () => {
    // Arrange
    request.body = {
      "name": "test_product",
      "description": "a test product insertion",
      "price": 42.00
    };
    // Act
    await products.post(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith, jsonCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.created);
    expect(jsonCalledWith).toMatchObject({ productID: 0 });
  });

  it('getAll sends proper response with item in DB.', async () => {
    // Arrange
    newObj = {
      name: "test_product",
      description: "a test product insertion",
      price: "42.00"
    };
    fakeDb = [ newObj ];
    // Act
    await products.getAll(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith, jsonCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.ok);
    expect(jsonCalledWith).toEqual([expect.objectContaining(newObj)]);
  });

  it('getOne...gets one and sends proper response.', async () => {
    // Arrange
    newObj = {
      id: 1,
      name: "test_product",
      description: "a test product insertion",
      price: 42.00
    };
    fakeDb = [ newObj ];
    // Act
    request.params.id = newObj.id;
    request.body = newObj;
    await products.getOne(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith, jsonCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.ok);
    expect(jsonCalledWith).toEqual([ newObj ]);
  });

  it('putOne has 204 response upon success', async () => {
    // Arrange
    fakeDb = [ { id: 1 } ];
    // Act
    request.params.id = 1;
    request.body = {
      name: "test_product",
      description: "a test product insertion",
      price: 42.00
    };
    await products.putOne(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.noContent);
  });

  it('putOne returns 404 when not found.', async () => {
    // Act
    request.params.id = 42;
    request.body = {
      name: "test_product",
      description: "a test product insertion",
      price: 42.00
    };
    await products.putOne(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith } = response;
    expect(error).toEqual({ statusCode: 404 });
    expect(statusCalledWith).toBeFalsy();
  });

  it('delOne returns appropriate response.', async () => {
    // Arrange
    fakeDb = [ { id: 1 } ]
    // Act
    request.params.id = 1;
    await products.delOne(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith } = response;
    expect(error).toBeNull();
    expect(statusCalledWith).toBe(status.noContent);
  });

  it('delOne returns 404 when not found.', async () => {
    // Act
    request.params.id = 42;
    await products.delOne(request, response, next)
      .catch((err) => { throw err; });
    // Assert
    const { statusCalledWith } = response;
    expect(error).toEqual({ statusCode: 404 });
    expect(statusCalledWith).toBeFalsy();
  });
});