var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},

    first_name: {type: String, required: false},
    last_name: {type: String, required: false},
    address: {type: String, required: false}
});

schema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Account', schema);