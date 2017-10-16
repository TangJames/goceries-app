const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('This will be the homepage');
});


const itemRoute = require('./item');
const userRoute = require('./users');


router.route('/api/items')
    .get(itemRoute.selectAllItems)
    .post(itemRoute.createItem);


router.route('/api/items/:id')
    .get(itemRoute.selectItem)
    .put(itemRoute.updateItem)
    .delete(itemRoute.deleteItem);





module.exports = router;
