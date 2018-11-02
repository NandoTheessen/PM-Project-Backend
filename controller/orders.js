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
    allOrders(){
        return db('order');
    }

}