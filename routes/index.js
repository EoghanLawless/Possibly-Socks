var express = require('express');
var csrf = require('csurf');
var passport = require('passport');
var router = express.Router();

var protection = csrf({cookie: false});
router.use(protection);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Possibly Socks' });
});
  
router.get('/cart', function(req, res, next) {
  res.render('cart', { title: 'Possibly Socks - Cart' });
});
  
router.get('/signup', function(req, res, next) {
  res.render('account/signup', { token: req.csrfToken() });
});
  
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = router;
