var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', (req, res, next)=>{
   bcrypt.hash(req.body.password, 10, (err, hash) =>{
       if(err) {
           console.log(err);
           return res.status(500).json({
               error: err
           });
       } else {
           const user = new User({
              _id : mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
           });
           user.save().then(result => {
               res.status(201).json({
                   message: 'User was created'
               });
           });
       }
   });
});

router.get('/', function(req, res, next) {
    User.find().select("email password _id").exec().then(result => {
        const response = {
            count: result.length,
            users: result
        };
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
module.exports = router;
