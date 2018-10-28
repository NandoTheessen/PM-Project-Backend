const db = require('../data/dbConfig')

module.exports = {
    newProd(name, description, price) {
        return db('products').insert({name: name, description: description, price: price});
    },

    getProds() {
        return db('products');
    }
}