const db = require('../data/dbConfig')

module.exports = {
    newProd(name, description, price) {
        return db('products').insert({name: name, description: description, price: price});
    },

    getProds() {
        return db('products');
    },

    getOneProd(id) {
      return db('products')
        .where({ id });
    },

    putOneProd(id, name, description, price) {
      return db('products')
        .where({ id })
        .update({ name, description, price });
    },

    delOneProd(id) {
      return db('products')
        .where({ id })
        .del();
    },
}