const db = require('../data/dbConfig');

module.exports = {
    findUser(id) {
        return db('customer')
            .where({ externalID: id })
            .first();
    },
    makeUser(id, displayName, email) {
        return db('customer')
            .insert({ name: displayName, externalID: id, email: email, username: id})
    }
}
