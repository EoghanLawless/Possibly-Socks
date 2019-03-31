var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var Store = require('connect-mongo')(session);
var mongoose = require('mongoose');
var csrf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

var index = require('./routes/index');
var account = require('./routes/account');
var brands = require('./routes/brands');
var categories = require('./routes/categories');
var products = require('./routes/products');

var app = express();

mongoose.connect('mongodb://localhost:27017/socks');
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session( {
  secret: 'secretpass', 
  resave: false, 
  saveUninitialized: false,
  store: new Store({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var protection = csrf({cookie: false});
app.use(protection);

// pass crsf token
app.use(function(req, res, next) {
  res.locals.token = req.csrfToken();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/account', account);
app.use('/brands', brands);
app.use('/category', categories);
app.use('/product', products);
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
