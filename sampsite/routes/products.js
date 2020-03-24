var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find().select('name price _id').exec().then(docs =>{
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id
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

router.post('/', function(req, res, next) {
  const product = new Product({
    _id : new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save().then(result => {
    console.log(result);
    res.status(200).json({
      message:'Created product succesfully',
      createdProduct: {
        name: result.name,
        price: result.price,
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});

router.get('/:productId', (req, res, next)=>{
  const id = req.params.productId;
  Product.findById(id).exec().then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: "No valid entry for specific id ", id: id});
    }

  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Product.findOneAndUpdate({_id: id}, {$set: updateOps}).exec().then(result => {
    console.log(result);
    res.status(200).json(result);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id}).exec().then(result => {
    console.log(result);
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  })
});

module.exports = router;
