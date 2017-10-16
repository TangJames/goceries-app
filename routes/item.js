const DB = require('../models/index');

//Selects one item by parameter id from specified DB.Item
function selectItem(req, res) {
	DB.Item.findOne({_id: req.params.id}, (err, fItem) => {
		res.json(fItem);
	});
}//end of selectItem()

//Selects all items from specified DB.Item
function selectAllItems(req, res) {
	DB.Item.find((err, items) => { // send all items as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(items);
	});
}//end of selectAllItems()

//Creates a simple item. create item into the specified DB.Item
function createItem(req, res) {
    console.log(req.body);
	(new DB.Item(req.body)).save((err, newItem) => {
		res.json(newItem);
	});
}//end of createItem()

//Updates one item by parameter id from specified DB.Item
function updateItem(req, res) {
	DB.Item.update({_id: req.params.id}, {$set: req.body}, {new:true}, (err, uItem) => {
		if (err) { return console.log("index error: " + err); }
		res.json(uItem);
	});
}//end of updateItem()

//Deletes one item by parameter id from specified DB.Item
function deleteItem(req, res) {
	DB.Item.findOneAndRemove({ _id: req.params.id }).exec((err, dItem) => {
		res.json(dItem);
	});
}//end of deleteItem()

//exporting common, simple CRUD methods for use by other routes
module.exports = {
	selectAllItems : selectAllItems,
	selectItem : selectItem,
	createItem : createItem,
	updateItem : updateItem,
	deleteItem : deleteItem
};
