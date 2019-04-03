var express = require('express');
var router = express.Router();

var Category = require('../models/category');
var Product = require('../models/product');


router.get('/', function(req, res, next) {
  Category.find(function(err, docs) {
    res.render('categories', { title: 'Categories', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', categories: docs });
  });
});

router.get('/all', function(req, res, next) {
  Product.find(function(err, docs) {
    res.render('products', { title: 'All socks', products: docs });
  });
});

router.get('/:category', function(req, res, next) {
  var category = req.params.category;
  var description;

  Category.find(function(err, docs) {
    docs.forEach(function(cat) {
      if(cat.name === category) {
        description = cat.short_description;
      }
    });
  });
  
  Product.find(function(err, docs) {
    var products = [];
    docs.forEach(function(product) {
      if(product.category === category) {
        products.push(product);
      }
    });
    res.render('products', { title: category, description: description, products: products });
  });
});

module.exports = router;
