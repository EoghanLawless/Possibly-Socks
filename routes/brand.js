var express = require('express');
var router = express.Router();

var Brand = require('../models/brand');
var Product = require('../models/product');

router.get('/', function(req, res, next) {
  Brand.find(function(err, docs) {
    res.render('brands', { title: 'Brands', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', brands: docs });
  });
});


router.get('/:brand', function(req, res, next) {
  var brand = req.params.brand;
  var description;

  Brand.find(function(err, docs) {
    docs.forEach(function(b) {
      if(b.name === brand) {
        description = b.short_description;
      }
    });
  });
  
  Product.find(function(err, docs) {
    var products = [];
    docs.forEach(function(product) {
      if(product.brand === brand) {
        products.push(product);
      }
    });
    res.render('products', { title: brand, description: description, products: products });
  });
});

module.exports = router;
