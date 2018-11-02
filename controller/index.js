const products = require('./products');
const customers = require('./customers');
const orders = require('./orders');

module.exports = {
    ...products,
    ...customers,
    ...orders
};