var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    short_description: {type: String, required: true},
    long_description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},

    brand: {type: String, required: true},
    category: {type: String, required: true}
});

module.exports = mongoose.model('Product', schema);