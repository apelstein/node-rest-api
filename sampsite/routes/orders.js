var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order');

/* GET orders listing. */
router.get('/', (req, res, next) => {
  Order.find().select('_id product quantity').exec().then(docs => {
      const response = {
          count: docs.length,
          orders: docs.map(doc => {
              return {
                  _id: doc._id,
                  product: doc.product,
                  quantity: doc.quantity,

                  request: {
                      type: "GET",
                      url: "http://localhost:3000/orders/" + doc._id
                  }
              }
          })
      }
      res.status(200).json(response);
  }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
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
