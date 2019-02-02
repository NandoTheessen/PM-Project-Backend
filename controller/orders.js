const db = require('../data/dbConfig');

module.exports = {
    allOrders(){
        return db('order')
            .leftJoin('prod_order', {'order.id': 'prod_order.order_id'})
            .leftJoin('products', {'prod_order.prod_id': 'products.id'})
            .leftJoin('customer', {'order.cust_id': 'customer.externalID'})
            .groupBy('prod_order.order_id')
            .sum('products.price as total')
            .select(
                'customer.name',
                'order.origination_date',
                'order.estimated_date',
                'order.completion_date',
                'order.progress',
                'prod_order.order_id')
    },

    async oneOrder(orderId){
        try{
            const order = await db('order')
                .where('order.id', orderId)
                .leftJoin('prod_order', {'order.id': 'prod_order.order_id'})
                .leftJoin('products', {'prod_order.prod_id': 'products.id'})
                .leftJoin('customer', {'order.cust_id': 'customer.externalID'})
                .sum('products.price as total')
                .select(
                    'customer.name',
                    'order.origination_date',
                    'order.estimated_date',
                    'order.completion_date',
                    'order.progress',
                    'prod_order.order_id')
                .first();
            const prods = await db('products')
                .where('prod_order.order_id', orderId)
                .leftJoin('prod_order', {'products.id': 'prod_order.prod_id'})
                .select(
                    'products.id',
                    'products.name',
                    'products.price');
                order.products = prods;
                order.total = Math.round(order.total * 100) / 100
            return order
        } catch(err) {
            console.log('orders error', err)
        }

    },

    allUsersOrders(externalId){
        return db('order')
            .where('order.cust_id', externalId)
            .select('id')
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

    updateOrder(id, update){
        return db('order')
            .where({ id: id })
            .update(update);
    },

    deleteOneOrder(id) {
        return db('order')
            .where({ id: id })
            .del();
    },
    
    // this will take an array of product numers
    addProdsToOrder(prod_order){
        return db('prod_order')
            .insert(prod_order)
    }, 

    delAllProdFromOrder(id){
        return db('prod_order')
            .where(id)
            .del()
    }
}