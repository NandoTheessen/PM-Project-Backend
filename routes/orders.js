const status = require('../utils/httpStatus');
const { 
    allOrders,
    newOrder,
    addProdsToOrder,
    oneOrder,
    updateOrder,
    deleteOneOrder,
    delAllProdFromOrder,
    allUsersOrders
} = require('../controller/index').orders;

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


const getAllbyToken = async function getTokenOrder(req, res, next) {
    try{
        const { externalID } = req.user;
        
        const orderNumbers = await allUsersOrders(externalID)
        const orderDetails = await orderNumbers.map(id => {
            return oneOrder(id.id)
        })
        Promise.all(orderDetails).then(value => {
            res.status(status.ok).json(value);
        });
        // res.status(status.ok).json(results);
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
        err['statusCode'] = status.badRequest;
        next(err)
    }
}

// should put some kind of check to keep from deleting orders that are processed
const deleteO = async function deleteOrder(req, res, next) {
    try{
        const orderId = req.params.id;
        const idForProd = { order_id: orderId }
        const deleted = await deleteOneOrder(orderId);
        await delAllProdFromOrder(idForProd)
        res.status(status.ok).json(deleted)
    } catch(err){
        err['statusCode'] = status.notFound;
        next(err);
    }
}

// expects to receive an order id and an array of products
const prodToOrder = async function postProdToOrder(req, res, next) {
    try{
        const { id } = req.params;
        const { products } = req.body;
        const prod_order = products.map(prod => {
            return { order_id: id, prod_id: prod};
        });
        const posted = await addProdsToOrder(prod_order);
        res.status(status.created).json(posted);
    }catch(err) {
        next(err);
    }
}

const delProdOrder = async function delProdFromOrder(req, res, next) {
    try{
        const { id } = req.params;
        const { products } = req.body;
        const idForProd = { prod_id: products, order_id: id }
        const deleted = await delAllProdFromOrder(idForProd);
        res.status(status.ok).json(deleted);
    }catch(err) {
        next(err);
    }
}


module.exports = {
    getAll,
    post,
    getOne,
    put,
    deleteO,
    prodToOrder,
    delProdOrder,
    getAllbyToken
};