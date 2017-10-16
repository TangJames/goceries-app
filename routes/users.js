const DB = require('../models');

//Selects one user by parameter id from specified DB.User
function selectUser(req, res) {
	DB.User.findOne({_id: req.params.id}, (err, fItem) => {
		res.json(fItem);
	});
}//end of selectUser()

//Selects all users from specified DB.User
function selectAllUsers(req, res) {
	DB.User.find((err, users) => { // send all users as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(items);
	});
}//end of selectAllUsers()

//Creates a simple user. create user into the specified DB.User
function createUser(req, res) {
	(new DB.User(req.body)).save((err, newItem) => {
		res.json(newItem);
	});
}//end of createUser()

//Updates one user by parameter id from specified DB.User
function updateUser(req, res) {
	DB.User.update({_id: req.params.id}, {$set: req.body}, {new:true}, (err, uItem) => {
		if (err) { return console.log("index error: " + err); }
		res.json(uItem);
	});
}//end of updateUser()

//Deletes one user by parameter id from specified DB.User
function deleteUser(req, res) {
	DB.User.findOneAndRemove({ _id: req.params.id }).exec((err, dItem) => {
		res.json(dItem);
	});
}//end of deleteUser()

//exporting common, simple CRUD methods for use by other routes
module.exports = {
	selectAllUsers : selectAllUsers,
	selectUser : selectUser,
	createUser : createUser,
	updateUser : updateUser,
	deleteUser : deleteUser
};
