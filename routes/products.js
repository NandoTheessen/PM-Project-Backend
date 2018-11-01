const status = require('../utils/httpStatus');
const{
    getProds,
    newProd
} = require('../controller/index');

// Product Handler Functions

const getAll = async function getAllProducts(req, res, next) {
    try {
        const products = await getProds();
        res.status(status.ok).json(products);
    } catch(err) {
        next(err);
    }
};

const post = async function postSingleProduct(req, res, next) {
    try {
        const { name, description, price } = req.body;
        const newProductId = await newProd(name, description, price);
        res.status(status.created).json({ productID: newProductId[0] });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getAll,
    post
};