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
    },

    newOrder(origination_date, estimated_date, externalID, startStatus){
        return db('order')
            // i think this is needed to return id on postgre
            .returning('id')
            .insert({
                origination_date: origination_date,
                estimated_date: estimated_date,
                cust_id: externalID,
                progress: startStatus});
    },
    
    addProdsToOrder(prod_order){
        return db('prod_order')
            .insert(prod_order)
    }
}