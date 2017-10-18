const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('login');
});

const cartRoute = require('./carts');
const itemRoute = require('./items');
const adminRoute = require('./admin');
const accountRoute = require('./accounts');

// Item API Routes
router.route('/api/items')
    .get(itemRoute.check_user, itemRoute.selectAllItems)
    .post(itemRoute.check_user, itemRoute.createItem);

router.route('/api/items/tags')
	.get(itemRoute.selectAllItemTags);

router.route('/api/items/:id')
    .get(itemRoute.check_user, itemRoute.selectItem)
    .put(itemRoute.check_user, itemRoute.updateItem)
    .delete(itemRoute.check_user, itemRoute.deleteItem);

router.route('/api/items/tags/:tags')
    .get(itemRoute.selectItemsByTag);

// Cart API Routes
router.route('/api/carts')
    .get(cartRoute.selectAllCarts)
    .post(cartRoute.createCart);

router.route('/api/carts/:id')
    .get(cartRoute.selectCart)
    .put(cartRoute.updateCart)
    .delete(cartRoute.deleteCart);


router.get('/storefront', (req, res) => {
    res.render('storefront');
});






// Admin Page Security Routes

router.route('/sessions')
    .post(accountRoute.newLoginSession);

router.route('/users')
    .post(accountRoute.registerNewUser);

router.route('/admin/panel')
    .get(accountRoute.getProfilePage);

router.route('/admin/login')
    .get(accountRoute.getLoginPage);

router.route('/admin/logout')
    .get(accountRoute.getLogoutPage);






















module.exports = router;
