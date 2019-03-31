var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/all', function(req, res, next) {
  Product.find(function(err, docs) {
    res.render('categories', { title: 'Possibly Socks - Categories', products: docs });
  });
});

router.get('/socks', function(req, res, next) {
  res.render('socks', { title: 'Possibly Socks - Socks' });
});

module.exports = router;
