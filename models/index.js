const mongoose = require('mongoose');

//import models
const user = require('./user');
const item = require('./item');
const cart = require('./cart');

//configure dotenv for reading .env properties
require('dotenv').config();

// connect to Mongo DB
mongoose.connection.openUri(process.env.MONGODB_URI ||process.env.DB_CONN, {}, (err, conn) => {
	if (err) { 	console.log('Error connecting to Mongo DB.', err); }
	else 	 {	console.log('Mongoose successfully connected to Mongo DB.'); }
});

//add mongo DB error event
mongoose.connection.on('error', (err) => {
	console.log(`MongoDB error: ${err}`);
});

//exporting models for use by other files
module.exports = {
	User: user.User,
	Item: item.Item,
	Cart: cart.Cart
};
