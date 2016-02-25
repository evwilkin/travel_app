var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (req.currentUser.username) {
		db.user.findById(userId).then(function(user) {  //identify current user
			user.getWishlists({
				include: [db.category, db.attraction]
			}).then(function(lists) {		//find all user's wishlists
				res.render('wishlist/index', {lists: lists});
				// res.send(lists);
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
	db.wishlist.findById(listId
		// , {
		// 		include: [db.category, db.attraction]
		// 	}
			).then(function(list) {

				list.getCategories({
					include: [db.attraction]
				}).then(function(categories) {
					res.render('wishlist/show', {list: list, categories: categories})
				});

		/*if (list) {
			if (list.userId === userId) {
				console.log("List id:"+list.userId+" UserId: "+userId)
				res.render('wishlist/show', {list: list});
			} else {
				res.send('Only that user can see their list');
			}
		} else {
			res.send('Page not found.');
		}*/
	});
});

router.post('/:id', function(req, res) {
	var listId = req.params.id;
	var currentUser = req.currentUser.id;
	var newCategory = req.body.newCategory;
	var newItem = req.body.newItem;
	db.wishlist.findOne({
		where: {
			id: listId
		}
	}).then(function(list) {
		if (newCategory) {
			db.category.findOrCreate({
				where: {
					wishlistId: list.id,
					categoryname: newCategory 
				}
			}).spread(function(category, created) {
				if (created) {
					res.redirect("/wishlist/"+listId);
				} else {
					res.send("Category already exists");
				}
			});
		}
	});
	// res.send("New Item: "+newItem+" in list: "+listId);
});





module.exports = router;