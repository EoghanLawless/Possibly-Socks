var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    account: {type: Schema.Types.ObjectId, ref: 'Account'},
    cart: {type: Object, required: true},

    name: {type: String, required: true},
    address: {type: String, required: true},

    payment_id: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);