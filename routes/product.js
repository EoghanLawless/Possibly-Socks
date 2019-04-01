var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');


router.get('/all', function(req, res, next) {
  res.render('products', { title: 'All products' });
});

router.get('/:product', function(req, res, next) {
  var product = req.params.product;

  Product.find(function(err, docs) {
    docs.forEach(function(p) {
      if(p.title === product) {
        res.render('product', { product: p });
      }
    });
  });
});

router.get('/addtocart/:id', function(req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(id, function(err, product) {
    if(err) {
      return res.redirect('back');
    }

    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('back');
  })
});

router.get('/removefromcart/:id', function(req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(id, function(err, product) {
    if(err) {
      return res.redirect('back');
    }

    cart.remove(product, product.id);
    req.session.cart = cart;
    res.redirect('back');
  })
});

module.exports = router;
