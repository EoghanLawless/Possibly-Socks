var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Cart = require('../models/cart');
var Brand = require('../models/brand');


router.get('/', function(req, res, next) {
  Brand.find(function(err, docs) {
    res.render('index', { title: 'Possibly Socks', brands: docs });
  });
});
  
router.get('/cart', function(req, res, next) {
  if(!req.session.cart) {
    res.render('cart', { title: 'Cart', products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('cart', { title: 'Cart', cart: cart.list(), total: cart.value });
});
  
router.get('/checkout', function(req, res, next) {
  if(!req.session.cart) {
    res.render('checkout', { title: 'Checkout', products: null });
  }

  var cart = new Cart(req.session.cart);
  console.log(req.user);
  console.log(req.account);
  res.render('checkout', { title: 'Checkout', cart: cart.list(), total: cart.value, account: req.user });
});

module.exports = router;
