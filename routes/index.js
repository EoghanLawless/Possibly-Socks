var express = require('express');
// var csrf = require('csurf');
var router = express.Router();

// var protection = csrf({cookie: false});
// router.use(protection);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Possibly Socks' });
});
  
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Possibly Socks - Cart' });
});

module.exports = router;
