const mongoose = require('mongoose');

//represented as a collection of Carts in the DB. 
const Cart = mongoose.model('Cart', new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	items: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item'
	}],
	itemsQty: [{
		type: Number,
		default: 1
	}],
	completed: {
		type: Boolean,
		default: false
	},
}));

module.exports = {
	Cart: Cart
}
