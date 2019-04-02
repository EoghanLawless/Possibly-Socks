var express = require('express');
var passport = require('passport');
var router = express.Router();

var Account = require('../models/account')


router.get('/signup', loggedOut, function(req, res, next) {
    var messages = req.flash('error');
    res.render('account/signup', { messages: messages, error: messages.length > 0 });
});
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: 'back',
    failureRedirect: '/account/signup',
    failureFlash: true
}));
  
router.get('/signin', loggedOut, function(req, res, next) {
    var messages = req.flash('error');

    res.render('account/signin', { messages: messages, error: messages.length > 0 });
});
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: 'back',
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
