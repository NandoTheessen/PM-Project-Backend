const express = require('express');
// Importing Controller Functions
const products = require('./products');
const customers = require('./customers');
const orders = require('./orders');
const passport = require('passport');


const notImplemented = function throwErrorForUnfinishedEndpoints(req, res, next) {
    next(new Error('not implemented'));
};

// Router Instantiation
const router = express.Router();

const tokenCheck = passport.authenticate(['jwt'], { session: false })
// Endpoints

// the frontend will need to place an href to this address. not an axios call
// this will direct the browser to a login to google and auth the app
router.route('/customers/register')
    .get(customers.googleStart);

// after google auths, it will redirect to this route. 
router.route('/customers/redirect')
    .get(customers.googleAuth, customers.googleRedirect);

router.route('/customers/')
    .get(tokenCheck, customers.getOneFromToken)


router.route('/customers/:id')
    .get(tokenCheck, customers.getOneFromId)
    .put(tokenCheck, customers.put)

router.route('/customers/email/')
    .post(tokenCheck, customers.postEmail);


router.route('/orders')
    .get(tokenCheck, orders.getAll)
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