const status = require('../utils/httpStatus');
const { 
    allOrders,
    newOrder,
    addProdsToOrder,
    oneOrder,
    updateOrder
} = require('../controller/index');

// this post will return arrey or objects that look like below
// {
//     "total": 102.1,
//     "name": "William VanDolah",
//     "origination_date": "2028-11-02",
//     "estimated_date": "2029-11-02",
//     "completion_date": null,
//     "progress": "New",
//     "order_id": 16
// }
const getAll = async function getAllOrders(req, res, next) {
    try{
        const orders = await allOrders();
        const roundedOrders = orders.map(order => {
            order.total = Math.round(order.total * 100) / 100
            return order;
        })
        res.status(status.ok).json(roundedOrders);
    } catch(err){
        next(err);
    }
}

const getOne = async function getOneOrder(req, res, next) {
    try{
        const { id } = req.params;
        const orderDetail = await oneOrder(id)
        res.status(status.ok).json(orderDetail);
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

const put = async function putOrder(req, res, next) {
    try{
        const { id } = req.params;
        const { estimated_date, completion_date, progress } = req.body;
        const toUpdate = { estimated_date, completion_date, progress };
        const update = await updateOrder(id, toUpdate);
        res.status(status.ok).json(update)
    } catch(err){
        err['statusCode'] = 400;
        next(err)
    }
}

module.exports = {
    getAll,
    post,
    getOne,
    put
};