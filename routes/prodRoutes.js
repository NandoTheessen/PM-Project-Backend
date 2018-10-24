const router = require('express').Router();
const controller = require('../controller/index')

router
    .route('/')
    .get(async (req, res, next) => {
        try {
            const prods = await controller.getProds();
            res.status(200).json(prods)
        } catch(err){
            next(err)
        }
    })
    .post(async (req, res, next) => {
        try {
            const {name, description, price} = req.body;
            const newProdId = await controller.newProd(name, description, price);
            res.status(201).json({prodID: newProdId[0]})
        } catch (err){
            next(err)
        }
    })
module.exports = router;