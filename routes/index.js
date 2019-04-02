var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Order = require('../models/order');
var Brand = require('../models/brand');


router.get('/', function(req, res, next) {
  var success = req.flash('success')[0];
  Brand.find(function(err, docs) {
    res.render('index', { title: 'Possibly Socks', brands: docs, success: success });
  });
});
  
router.get('/cart', function(req, res, next) {
  if(!req.session.cart) {
    res.render('cart', { title: 'Cart', products: null });
  }

  var cart = new Cart(req.session.cart);
  res.render('cart', { title: 'Cart', cart: cart.list(), total: cart.value });
});
  
router.get('/checkout', loggedIn, function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/cart');
  }

  var cart = new Cart(req.session.cart);
  var error = req.flash('error')[0];
  res.render('checkout', { title: 'Checkout', cart: cart.list(), total: cart.value, account: req.user, error: error });
});
  
router.post('/checkout', loggedIn, function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/cart');
  }

  var stripe = require("stripe")(
    "sk_test_iN0y6rwl5X2Ila9WgJIuOT5h00rLdgNTYD"
  );

  var cart = new Cart(req.session.cart);
  stripe.charges.create({
    amount: cart.value * 100,
    currency: "eur",
    source: req.body.stripeToken,
    description: "Possibly Socks charge"
  }, function(err, charge) {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }

    var order = new Order({
      account: req.user,
      cart: cart,
      name: req.body.cardholder,
      address: req.body.address,
      payment_id: charge.id
    });

    order.save(function(err, result) {
      req.flash('success', 'Successful purchase');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});

module.exports = router;

function loggedIn(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}

function loggedOut(req, res, next) {
  if(!req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}
