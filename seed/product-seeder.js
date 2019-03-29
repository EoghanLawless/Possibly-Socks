var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socks')

var products = [
    new Product({
        title: 'Possibly',
        description: 'Comfy',
        price: 30,
        thumbnail: '/images/scott_nichol_socks_square.jpg',

        brand: 'Possibly Socks',
        category: 'Ankle socks'
    }),
    new Product({
        title: 'Happy',
        description: 'Happy',
        price: 30,
        thumbnail: '/images/scott_nichol_socks_square.jpg',

        brand: 'Happy Socks',
        category: 'Knee high socks'
    }),
    new Product({
        title: 'Scott-Nichol',
        description: 'Socks',
        price: 30,
        thumbnail: '/images/scott_nichol_socks_square.jpg',

        brand: 'Scott-Nichol Socks',
        category: 'Thigh high socks'
    }),
    new Product({
        title: 'Happier',
        description: 'More socks',
        price: 30,
        thumbnail: '/images/scott_nichol_socks_square.jpg',

        brand: 'Happy Socks',
        category: 'Sock socks'
    })
];

var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, res) {
        done++;
        if(done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}