var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (req.currentUser.username) {
		db.user.findById(userId).then(function(user) {
			user.getWishlists().then(function(lists) {
				res.render('wishlist/index', {lists: lists});
			});
		});
	} else {
		res.redirect('/auth/login');
	}
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

router.get('/new', function(req, res) {
	if (req.currentUser.username) {
		res.render('wishlist/new');
	} else {
		res.redirect('/auth/login');
	}
});

router.get('/:id', function(req, res) {
	var listId = req.params.id;
	var userId = req.currentUser.id;
	db.wishlist.findById(listId).then(function(list) {
		if (list.userId === userId) {
			console.log("List id:"+list.userId+" UserId: "+userId)
			res.render('wishlist/show', {list: list});
		} else {
			res.send('Only that user can see their list');
		}
	});
});

/*router.post('/:id', function(req, res) {
	var listId = req.params.id;
	var currentUser = req.currentUser.id;
	var newItem = req.body.item;
	db.wishlist.findOne({
		where: {
			id: listId
		}
	}).then(function(list) {
		list.append
	})
	}
})*/



module.exports = router;