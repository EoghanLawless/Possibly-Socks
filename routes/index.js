var express = require('express');
var Cart = require('../models/cart');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Possibly Socks' });
});
  
router.get('/cart', function(req, res, next) {
  if(!req.session.cart) {
    res.render('cart', { title: 'Possibly Socks - Cart', products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('cart', { title: 'Possibly Socks - Cart', products: cart.list(), total: cart.value });
});

module.exports = router;
