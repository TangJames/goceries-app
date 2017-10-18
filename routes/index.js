const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.redirect('/home/login');
});

const cartRoute = require('./carts');
const itemRoute = require('./items');
const accountRoute = require('./accounts');
const homeRoute = require('./homeAccounts');

// Item API Routes
router.route('/api/items')
    .get(itemRoute.check_user, itemRoute.selectAllItems)
    .post(itemRoute.check_user, itemRoute.createItem);

router.route('/api/items/tags')
	.get(itemRoute.check_user, itemRoute.selectAllItemTags);

router.route('/api/items/:id')
    .get(itemRoute.check_user, itemRoute.selectItem)
    .put(itemRoute.check_user, itemRoute.updateItem)
    .delete(itemRoute.check_user, itemRoute.deleteItem);

router.route('/api/items/tags/:tags')
    .get(itemRoute.check_user, itemRoute.selectItemsByTag);

// Cart API Routes
router.route('/api/carts')
    .get(itemRoute.check_user, cartRoute.selectAllCarts)
    .post(itemRoute.check_user, cartRoute.createCart);

router.route('/api/carts/:id')
    .get(itemRoute.check_user, cartRoute.selectCart)
    .put(itemRoute.check_user, cartRoute.updateCart)
    .delete(itemRoute.check_user, cartRoute.deleteCart);



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


// Home Page Authentication

router.route('/home/sessions')
    .post(homeRoute.newLoginSession);

router.route('/home/users')
    .post(homeRoute.registerNewUser);

router.route('/home/panel')
    .get(homeRoute.getProfilePage);

router.route('/home/login')
    .get(homeRoute.getLoginPage);

router.route('/home/logout')
    .get(homeRoute.getLogoutPage);


















module.exports = router;
