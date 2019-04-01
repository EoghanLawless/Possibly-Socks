var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    short_description: {type: String, required: true},
    long_description: {type: String, required: true},
    thumbnail: {type: String, required: true}
});

module.exports = mongoose.model('Brand', schema);