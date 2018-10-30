const status = require('../utils/httpStatus');

const validateProduct = function ({ name, description, price }) {
  if (name && description && price) {
    let errorString = "";

    if (typeof name !== 'string') {
      errorString += "'name' must be type string.\n";
    }
    if (name.length > 128) {
      errorString += "'name' must be 128 characters or less.\n";
    }
    if (typeof description !== 'string') {
      errorString += "'description' must be type string.\n";
    }
    if (typeof price !== 'number') {
      errorString += "'price' must be type number.\n";
    }

    if (errorString) {
      err = {
        statusCode: status.badRequest,
        message: errorString
      }
      throw err;
    }
  }
  else {
    err = {
      statusCode: status.badRequest,
      message: "'name', 'description', and 'price' are required in request body."
    }
    throw err;
  }

  return { name, description, price };
};

module.exports = {
  validateProduct
}