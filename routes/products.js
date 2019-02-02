const status = require('../utils/httpStatus');
<<<<<<< HEAD
const{
=======

const { validateProduct } = require('./validators');

const {
>>>>>>> 59b0b37cb0a7c7b7cf81acd17c306e6d02d7b28c
    getProds,
    newProd,
    getOneProd,
    putOneProd,
    delOneProd,
} = require('../controller/index').products;

// Product Handler Functions

const getAll = async function getAllProducts(req, res, next) {
    try {
        const products = await getProds();
        res.status(status.ok).json(products);
    } catch (err) {
        next(err);
    }
};

const post = async function postSingleProduct(req, res, next) {
    try {
        const { name, description, price } = validateProduct(req.body);
        const newProductId = await newProd(name, description, price);
        res.status(status.created).json({ productID: newProductId[0] });
    } catch (err) {
        next(err);
    }
};

const getOne = async function getSingleProduct(req, res, next) {
    const { id } = req.params;

    try {
        const product = await getOneProd(id);
        res.status(status.ok).json(product);
    }
    catch (err) {
        next(err);
    }
};

const putOne = async function editSingleProduct(req, res, next) {
    const { id } = req.params;
    const { name, description, price } = validateProduct(req.body);

    try {
        const count = await putOneProd(id, name, description, price);
        if (count) {
            res.status(status.ok).json(count);
        }
        else {
            err = { statusCode: status.notFound }
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
};

const delOne = async function deleteSingleProduct(req, res, next) {
    const { id } = req.params;

    try {
        const count = await delOneProd(id);

        if (count) {
            res.status(status.ok).json(count);
        }
        else {
            err = { statusCode: status.notFound }
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    post,
    getOne,
    putOne,
    delOne,
};