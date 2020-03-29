var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

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
    Product.findById(req.body.product)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: 'Product does not exist'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: product
        });
        return order.save();
    })

    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Oreder was stored',
            order: result
        });
    }).catch(err=>{
        res.status(500).json({
            error: err
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'product not found',
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId).select("_id product quantity").exec()
        .then(order => {
            if(!order) {
                res.status(404).json({
                    message: 'Order does not exist'
                });
            } else {
                res.status(200).json({
                    message: 'Order was found',
                    created_order: order
                });
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
    });
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({_id: req.params.orderId}).exec().then(result => {
        res.status(200).json({
            message: 'Order was removed',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
