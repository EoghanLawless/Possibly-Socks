var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/signup', loggedOut, function(req, res, next) {
  var messages = req.flash('error');

  var error = messages.length > 0;
  if(error) {
    res.render('account/signup', { messages: messages, error: error });
  }
});
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/account/signup',
  failureFlash: true
}));

  
router.get('/signin', loggedOut, function(req, res, next) {
  var messages = req.flash('error');

  var error = messages.length > 0;
  if(error) {
    res.render('account/signin', { messages: messages, error: error });
  }
});
router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/account/signin',
  failureFlash: true
}));

router.get('/logout', loggedIn, function(req, res, next) {
    req.logOut();
    res.redirect('/');
})

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