var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var protection = csrf();
router.use(protection);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Possibly Socks' });
});
  
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Possibly Socks - Cart' });
});
  
router.get('/sign-up', function(req, res, next) {
  res.render('account/signup', { token: req.csrfToken });
});

module.exports = router;
