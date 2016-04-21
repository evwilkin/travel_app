var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (req.currentUser.username) {
		//identify current user
		db.user.findById(userId).then(function(user) {  
			user.getWishlists({
				include: [db.category, db.attraction]
			}).then(function(lists) {		
				//find all user's wishlists
				res.render('wishlist/index', {lists: lists});
			});
		});
	} else {
		req.flash('danger', 'Please log in to access your Wishlists');
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
		req.flash('danger', 'Please log in to create a new wishlist.');
		res.redirect('/auth/login');
	}
});

router.get('/:id', function(req, res) {
	var listId = req.params.id;
	var userId = req.currentUser.id;
	db.wishlist.findById(listId).then(function(list) {
		if (list) {
			if (list.userId === userId) {
				list.getCategories({
					include: [db.attraction]
				}).then(function(categories) {
					res.render('wishlist/show', {list: list, categories: categories})
				});
			} else {
				req.flash('danger', 'Only that user can see their lists.');
				res.redirect('/auth/login');
			}
		} else {
			req.flash('danger', 'Page not found.');
			res.redirect('/auth/login');
		}
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
					req.flash('danger', 'Oops - that category already exists.');
					res.redirect('/wishlist/'+listId);
				}
			});
		} else if (newItem) {
			var itemCategory = req.body.itemCategory;
			db.category.findOne({
				where: {
					wishlistId: list.id,
					categoryname: itemCategory
				}
			}).then(function(category) {
				db.attraction.findOrCreate({
					where: {
						categoryId: category.id,
						item: newItem,
						wishlistId: list.id
					}
				}).spread(function(item, created) {
					if (created) {
						res.redirect("/wishlist/"+listId);
					} else {
						req.flash('danger', 'Oops - that item already exists.');
						res.redirect('/wishlist/'+listId);
					}
				});
			});	
		}
	});
});





module.exports = router;