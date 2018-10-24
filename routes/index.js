const express = require('express');
const prodRoutes = require('./prodRoutes')
const router = express.Router();

router.use('/prods', prodRoutes)

module.exports = router;