const db = require('../data/dbConfig');

module.exports = {

  async findUser(id) {
    try {
      const foundUser = await db('customer')
        .where({ externalID: id })
        .first();
      if (foundUser) {
        const foundEmails = await db('customer_email').where({ cust_id: id });
        const emails = foundEmails.map(email => email.email);
        foundUser['emails'] = emails;
      }
        return foundUser;
    } catch (err) {
        console.log('findUser Error', err);
    }
  },

  async makeUser(id, displayName) {
    const result = await db('customer').insert({
      name: displayName,
      externalID: id
    });

    if (result) {
      return this.findUser(id);
    }
  },

  putUser(id, update) {
    return db('customer')
      .where({ externalID: id })
      .update(update);
  },

  // this add expects an object or array of object {email: <email>, cust_id: <externalID>}
  addEmail(email) {
    console.log('inside db', email);
    return db('customer_email').insert(email);
  }
};
