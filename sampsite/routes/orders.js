var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order');

/* GET orders listing. */
router.get('/', (req, res, next) => {
  res.status(200).json({
      message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
    const order = new Order({
       _id: mongoose.Types.ObjectId(),
       quantity: req.body.quantity,
       product: req.body.product
    });
    order.save().then(result => {
        console.log(result);
        res.status(201).json(result);
    }).catch(err=>{
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;