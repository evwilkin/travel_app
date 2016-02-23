var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var user = req.currentUser.id;
	db.wishlist.findAll({
		where: {
			userId: user
		}
	}).then(function(lists) {
		res.render('wishlist/index', {lists: lists});
	});
});

router.get('/new', function(req, res) {
	if (req.currentUser.username) {
		res.render('wishlist/new');
	} else {
		res.redirect('/auth/login');
	}
});

router.get('/:id', function(req, res) {
	res.render('wishlist/show');
});

router.post('/', function(req, res) {
	var name = req.body.name;
	var category = req.body.category;
	var item = req.body.item;
	var userId = req.session.userId;
	db.user.findById(userId).then(function(user) {
		user.createWishlist({
			name: name,
			category: category,
			item: item
		}).then(function() {
			res.redirect('/wishlist');
		});
	});
});

module.exports = router;