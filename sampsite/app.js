var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var uRouter = require('./routes/users');
const bodyParser = require('body-parser');

var app = express();

const mongoose = require('mongoose');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb+srv://giladap:'+process.env.MONGO_ATLAS_PASSWORD +'@cluster0-nxgbi.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true, // new parameters
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(logger('dev'));

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', uRouter);

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works!skfjlskdjf'
//   });
// });



// catch 404 and forward to error handler
app.use((req, res, next) =>{
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
