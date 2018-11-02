const status = require('../utils/httpStatus');
const { 
    allOrders,
    newOrder,
    addProdsToOrder
} = require('../controller/index');

const getAll = async function getAllOrders(req, res, next) {
    try{
        const orders = await allOrders();
        res.status(status.ok).json(orders);
    } catch(err){
        next(err);
    }
}

const post = async function postOrder(req, res, next) {
    try{
        const { origination_date, estimated_date, products } = req.body;
        const { externalID } = req.user;
        const startStatus = "New";
        const order = await newOrder(origination_date, estimated_date, externalID, startStatus);
        const prod_order = products.map(prod => {
            return { order_id: order[0], prod_id: prod};
        })
        await addProdsToOrder(prod_order);
        res.status(status.created).json({ message: "Order created", order: order });
    } catch(err){
        next(err);
    }
}

module.exports = {
    getAll,
    post
};