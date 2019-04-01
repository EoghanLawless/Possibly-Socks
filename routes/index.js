var express = require('express');
var Brand = require('../models/brand');
var Cart = require('../models/cart');
var router = express.Router();




router.get('/', function(req, res, next) {
  Brand.find(function(err, docs) {
    res.render('index', { title: 'Possibly Socks', brands: docs });
  });
});
  
router.get('/cart', function(req, res, next) {
  if(!req.session.cart) {
    res.render('cart', { title: 'Possibly Socks - Cart', products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('cart', { title: 'Possibly Socks - Cart', products: cart.list(), total: cart.value });
});

module.exports = router;
