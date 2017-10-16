const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
});

const cartRoute = require('./carts');
const itemRoute = require('./items');
const userRoute = require('./users');
const adminRoute = require('./admin');

// Item API Routes
router.route('/api/items')
    .get(itemRoute.selectAllItems)
    .post(itemRoute.createItem);

router.route('/api/items/:id')
    .get(itemRoute.selectItem)
    .put(itemRoute.updateItem)
    .delete(itemRoute.deleteItem);



	// Cart API Routes
	router.route('/api/carts')
	    .get(cartRoute.selectAllCarts)
	    .post(cartRoute.createCart);

	router.route('/api/carts/:id')
	    .get(cartRoute.selectCart)
	    .put(cartRoute.updateCart)
	    .delete(cartRoute.deleteCart);



router.get('/', (req, res) => {
    res.render('login');
});

router.get('/storefront', (req, res) => {
    res.render('storefront');
});








// Admin Page Routes
router.route('/admin/home/items')
    .get(itemRoute.selectAllItems)
    .post(itemRoute.createItem);

router.route('/admin/home/items/:id')
    .get(itemRoute.selectItem)
    .put(itemRoute.updateItem)
    .delete(itemRoute.deleteItem);

router.route('/admin')
    .get(adminRoute.renderAdminLogin);

router.route('/admin/home')
    .get(adminRoute.renderAdminHome);

module.exports = router;
