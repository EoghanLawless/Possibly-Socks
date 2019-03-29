var express = require('express');
var router = express.Router();

router.get('/all', function(req, res, next) {
  res.render('categories', { title: 'Possibly Socks - Categories' });
});

router.get('/sock', function(req, res, next) {
  res.render('product', { title: 'Possibly Socks - Product' });
});

module.exports = router;
