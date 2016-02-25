var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (req.currentUser.username) {
		db.user.findById(userId).then(function(user) {  //identify current user
			user.getWishlists().then(function(lists) {		//find all user's wishlists
				res.render('wishlist/index', {lists: lists});
			});
		});
	} else {
		res.redirect('/auth/login');
	}
});

router.post('/', function(req, res) {
	var name = req.body.name;
	var categoryname = req.body.category;
	var item = req.body.item;
	var userId = req.session.userId;
	db.user.findById(userId).then(function(user) {
		user.createWishlist({
			name: name
		}).then(function(wishlist) {
			wishlist.createCategory({
				categoryname: categoryname
			}).then(function(category) {
				category.createAttraction({
					item: item,
					wishlistId: wishlist.id
				}).then(function() {
					res.redirect('/wishlist');
				});
			});
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
		if (list) {
			if (list.userId === userId) {
				console.log("List id:"+list.userId+" UserId: "+userId)
				res.render('wishlist/show', {list: list});
			} else {
				res.send('Only that user can see their list');
			}
		} else {
			res.send('Page not found.');
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