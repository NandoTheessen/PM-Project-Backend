const express = require('express');

// Importing Controller Functions
const products = require('./products');

const notImplemented = function throwErrorForUnfinishedEndpoints(req, res, next) {
    next(new Error('not implemented'));
};

// Router Instantiation
const router = express.Router();

// Endpoints
router.use('/customers/register', notImplemented);

router.use('/customers/login', notImplemented);

router.route('/orders')
    .get(notImplemented)
    .post(notImplemented);

router.route('/orders/:id')
    .get(notImplemented)
    .put(notImplemented)
    .delete(notImplemented);

router.route('/products')
    .get(products.getAll)
    .post(products.post);

router.route('/products/:id')
    .get(notImplemented)
    .put(notImplemented)
    .delete(notImplemented);

module.exports = router;