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