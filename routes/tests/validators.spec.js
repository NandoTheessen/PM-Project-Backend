const status = require('../../utils/httpStatus');
const {
  validateProduct
} = require('../validators');

describe('Validator Testing', () => {
  describe('Product Validation:', () => {
    it('Returns input if input is valid.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      // Act
      const result = validateProduct(testObj);
      // Assert
      expect(result).toEqual(testObj);
    });

    it('Ignores extraneous input.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      const biggerObj = { ...testObj, uselessStuff: 1337 };
      // Act
      const result = validateProduct(biggerObj);
      // Assert
      expect(result).toEqual(testObj);
    });

    it('Throws error if field is missing.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      // Act
      // Assert in Catch Blocks
      try {
        const { name, ...incompleteObj } = testObj;
        validateProduct(incompleteObj);
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name', 'description', and 'price' are required in request body.");
      }
      try {
        const { description, ...incompleteObj } = testObj;
        validateProduct(incompleteObj);
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name', 'description', and 'price' are required in request body.");
      }
      try {
        const { price, ...incompleteObj } = testObj;
        validateProduct(incompleteObj);
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name', 'description', and 'price' are required in request body.");
      }
      try {
        validateProduct({});
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name', 'description', and 'price' are required in request body.");
      }
    });

    it('Properly validates name.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      // Act
      // Assert in Catch blocks
      try {
        validateProduct({ ...testObj, name: true });
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name' must be type string.\n");
      }
      try {
        validateProduct({ ...testObj, name: "OGzfbafQekJgElGkOHamzfxmjeOMpZZVPoNoSTaxiaaPlgzhRJGQegsPkKqMdMWcctJekvVlxeOQUfQSYlxGsTmIrPumjhVhSREOMexwoPYVdpNYKlXtCuwslQHgwiMvZTYBIftvKXpvmpSQUnaQin" });
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'name' must be 128 characters or less.\n");
      }
    });

    it('Properly validates description.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      // Act
      // Assert in Catch blocks
      try {
        validateProduct({ ...testObj, description: 20 });
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'description' must be type string.\n");
      }
    });

    it('Properly validates price.', () => {
      // Arrange
      const testObj = {
        name: "Product",
        description: "Test Product",
        price: 3
      };
      // Act
      // Assert in Catch blocks
      try {
        validateProduct({ ...testObj, price: "20" });
      } catch (err) {
        const { statusCode, message } = err;
        expect(statusCode).toBe(status.badRequest);
        expect(message).toBe("'price' must be type number.\n");
      }
    });
  });
});