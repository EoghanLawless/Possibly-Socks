// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var schema = new Schema({
//     title: {type: String, required: true},
//     description: {type: String, required: true},
//     price: {type: Number, required: true},
//     thumbnail: {type: String, required: true},

//     brand: {type: String, required: true},
//     category: {type: String, required: true}
// });

// module.exports = mongoose.model('Cart', schema);

module.exports = function Cart(Cart) {
    this.products = Cart.products || {};
    this.quantity = Cart.quantity || 0;
    this.value = Cart.value || 0;

    this.add = function(product, id) {
        var cartItem = this.products[id];

        if(!cartItem) {
            cartItem = this.products[id] = {product: product, quantity: 0, price: 0};
        }

        cartItem.quantity++;
        cartItem.price = cartItem.product.price * cartItem.quantity;

        this.quantity++;
        this.value += cartItem.product.price;
    };

    this.remove = function(product, id) {
        var cartItem = this.products[id];

        if(cartItem) {
            if(cartItem.quantity - 1 === 0) {
                delete this.products[id];
            } else {
                cartItem = this.products[id] = { product: product, quantity: (cartItem.quantity - 1), price: (cartItem.price - cartItem.product.price) };
            }
            
            this.quantity--;
            this.value -= cartItem.product.price;
        }
    };

    this.list = function() {
        var array = [];

        for(var id in this.products) {
            array.push(this.products[id]);
        }

        return array;
    }
}