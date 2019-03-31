var passport = require('passport');
var Account = require('../models/account');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(account, done) {
    done(null, account.id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, account) {
        done(err, account);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});

    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    Account.findOne({'email': email}, function(err, account) {
        if(err) {
            return done(err);
        }
        if(account) {
            return done(null, false, {message: 'Email is already in use'});
        }

        var newAccount = new Account();
        newAccount.email = email;
        newAccount.password = newAccount.encryptPassword(password);

        newAccount.save(function(err, result) {
            if(err) {
                return done(err);
            }
            return done(null, newAccount);
        });
    })
}));

passport.use('local.signin', new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});

    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    Account.findOne({'email': email}, function(err, account) {
        if(err) {
            return done(err);
        }
        if(!account) {
            return done(null, false, {message: 'Account not found'});
        }
        if(!account.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password'});
        }
        
        return done(null, account);
    })
}));