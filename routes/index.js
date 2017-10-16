const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
});


const itemRoute = require('./item');
const userRoute = require('./users');

// Item API Routes
router.route('/api/items')
    .get(itemRoute.selectAllItems)
    .post(itemRoute.createItem);

router.route('/api/items/:id')
    .get(itemRoute.selectItem)
    .put(itemRoute.updateItem)
    .delete(itemRoute.deleteItem);
























// Admin Page Routes
router.route('/admin/items')
    .get(itemRoute.selectAllItems)
    .post(itemRoute.createItem);

router.route('/admin/items/:id')
    .get(itemRoute.selectItem)
    .put(itemRoute.updateItem)
    .delete(itemRoute.deleteItem);

module.exports = router;


























