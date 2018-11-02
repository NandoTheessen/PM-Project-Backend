const db = require('../data/dbConfig');

module.exports = {
    // findUser(id) {
    //     return db('customer')
    //         .select(["customer.externalID", "customer.name", "customer.address", 
    //             "customer.phone", "customer.created_at", "customer_email.email"])
    //         .where({ externalID: id })
    //         .leftJoin('customer_email', {'customer.externalID': 'customer_email.cust_id'})
    //         .first();
    // },
    async findUser(id) {
        try{
            const foundUser = await db('customer')
                .where({ externalID: id })
                .first();
            const foundEmails = await db('customer_email')
                .where({ cust_id: id })
            const emails = foundEmails.map(email => email.email)
            foundUser['emails'] = emails
            return foundUser
        }catch (err){
            console.log('findUser Error', err)
        }
    },

    makeUser(id, displayName) {
        return db('customer')
            .insert({ name: displayName, externalID: id});
    },

    putUser(id, update) {
        return db('customer')
            .where({ externalID: id })
            .update(update);
    },

// this add expects an object or array of object {email: <email>, cust_id: <externalID>}
    addEmail(email) {
        console.log("inside db", email)
        return db('customer_email')
            .insert(email);
    }
}
