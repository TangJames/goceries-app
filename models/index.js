const mongoose = require('mongoose');

//import models
const user = require('./user');
const item = require('./item');
const cart = require('./cart');

//exporting models for use by other files
module.exports = {
	User: user.User,
	Item: item.Item,
	Cart: cart.Cart
};
