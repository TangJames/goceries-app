const mongoose = require('mongoose');
require('dotenv').config();

// connect to Mongoose/Mongo DB
mongoose.connection.openUri(process.env.MONGODB_URI || process.env.DB_CONN, {}, (err, conn) => {
    if (err) {
        console.log('Error connecting to Mongo DB.', err);
    }
    else {
        console.log('Mongoose successfully connected to Mongo DB.');
    }
});



//add mongo DB error event
mongoose.connection.on('error', (err) => {
    console.log(`MongoDB error: ${err}`);
});




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
