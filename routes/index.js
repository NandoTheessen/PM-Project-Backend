const express = require('express');
// Importing Controller Functions
const products = require('./products');
const customers = require('./customers');
const auth = require('./auth');
const orders = require('./orders');
const passport = require('passport');

const notImplemented = function throwErrorForUnfinishedEndpoints(
  req,
  res,
  next
) {
  next(new Error('not implemented'));
};

// Router Instantiation
const router = express.Router();

const tokenCheck = passport.authenticate(['jwt'], { session: false });
// Endpoints

// the frontend will need to place an href to this address. not an axios call
// this will direct the browser to a login to google and auth the app

router.route('/admins/register').get(auth.googleStart('admins'));

router
  .route('/admins/redirect')
  .get(auth.googleAuth('admins'), auth.googleRedirect);

router.route('/customers/register').get(auth.googleStart('customers'));

// after google auths, it will redirect to this route.
router
  .route('/customers/redirect')
  .get(auth.googleAuth('customers'), auth.googleRedirect);

router
  .route('/customers/')
  .get(tokenCheck, customers.getOneFromToken)
  .put(tokenCheck, customers.putToken);

router
  .route('/customers/:id')
  .get(tokenCheck, auth.isAdminCheck, customers.getOneFromId)
  .put(tokenCheck, auth.isAdminCheck, customers.put);

router.route('/customers/email/').post(tokenCheck, customers.postEmail);

router
  .route('/orders')
  .get(tokenCheck, auth.isAdminCheck, orders.getAll)
  .post(tokenCheck, orders.post);

router
  .route('/orders/token')
  .get(tokenCheck, orders.getAllbyToken)

router
  .route('/orders/:id')
  .get(tokenCheck, orders.getOne)
  .put(tokenCheck, orders.put)
  .delete(tokenCheck, orders.deleteO);

// these routes are to delete or add a product to an order. expects order ID param
router
  .route('/orders/products/:id')
  .post(tokenCheck, orders.prodToOrder)
  .delete(tokenCheck, orders.delProdOrder);

router
  .route('/products')
  .get(products.getAll)
  .post(tokenCheck, auth.isAdminCheck, products.post);

router
  .route('/products/:id')
  .get(products.getOne)
  .put(tokenCheck, auth.isAdminCheck, products.putOne)
  .delete(tokenCheck, auth.isAdminCheck, products.delOne);

module.exports = router;
