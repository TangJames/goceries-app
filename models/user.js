const mongoose = require('mongoose');

//represented as a collection of Carts in the DB. 
const User = mongoose.model('User', new mongoose.Schema({
    gitHubAccessToken: String,
	facebookAccessToken: String,
    firstName: String,
    lastName: String,
    email: String,
}));

module.exports = {
	User: User
}
