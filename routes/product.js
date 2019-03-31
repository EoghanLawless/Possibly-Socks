var express = require('express');
var Cart = require('../models/cart');
var Product = require('../models/product');
var router = express.Router();

router.get('/all', function(req, res, next) {
  res.render('categories', { title: 'Possibly Socks - Categories' });
});

router.get('/sock', function(req, res, next) {
  res.render('product', { title: 'Possibly Socks - Product' });
});

router.get('/addtocart/:id', function(req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(id, function(err, product) {
    if(err) {
      return res.redirect('/');
    }

    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
});

module.exports = router;
