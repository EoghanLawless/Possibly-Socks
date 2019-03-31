var express = require('express');
var router = express.Router();

router.get('/all', function(req, res, next) {
  res.render('brands', { title: 'Possibly Socks - Brands' });
});

router.get('/possibly-socks', function(req, res, next) {
  res.render('possibly', { title: 'Possibly Socks' });
});

router.get('/happy-socks', function(req, res, next) {
  res.render('happy', { title: 'Happy Socks' });
});

router.get('/scott-nichols', function(req, res, next) {
  res.render('scott', { title: 'Scott-Nichol Socks' });
});

module.exports = router;
