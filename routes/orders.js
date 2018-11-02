const status = require('../utils/httpStatus');
const { 
    allOrders
} = require('../controller/index');

const getAll = async function getAllOrders(req, res, next) {
    try{
        const orders = await allOrders();
        res.status(status.ok).json(orders)
    } catch(err){
        next(err);
    }
}

const post = async function postOrder(req, res, next) {
    try{

    } catch(err){
        next(err)
    }
}

module.exports = {
    getAll,
};