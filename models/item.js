const mongoose = require('mongoose');

//represented as a collection of Items in the DB.
const Item = mongoose.model('Item', new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		default: 0,
		required: true
	},
	tags: {
		type: String
	}
}));

module.exports = {
	Item: Item
}
