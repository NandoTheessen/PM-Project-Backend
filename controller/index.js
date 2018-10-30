const products = require('./products');
const customers = require('./customers');

module.exports = {
    ...products,
    ...customers
};