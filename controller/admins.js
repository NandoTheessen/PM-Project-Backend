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
            const foundAdmin = await db('admin')
                .where({ externalID: id })
                .first();
            const foundEmails = await db('admin_email')
                .where({ admin_id: id });
            const emails = foundEmails.map(email => email.email)
            foundAdmin['emails'] = emails;
            return foundAdmin;
        }catch (err){
            console.log('findAdmin Error', err)
        }
    },

    makeUser(id, displayName) {
        return db('admin')
            .insert({ name: displayName, externalID: id});
    },

    putUser(id, update) {
        return db('admin')
            .where({ externalID: id })
            .update(update);
    },

// this add expects an object or array of object {email: <email>, cust_id: <externalID>}
    addEmail(email) {
        console.log("inside admin db", email)
        return db('admin_email')
            .insert(email);
    }
}
