var express = require('express');
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');

router.get('/login', function(req, res) {
	res.render('auth/login');
});

router.post('/login', function(req, res) {
	//collect user info & check against DB
	var username = req.body.username;
	var password = req.body.password;
	db.user.find({
		where: {
			username: username
		}
	}).then(function(user) {
		if (user) {
			bcrypt.compare(password, user.password, function(err, result) {
				if (err) {
					res.send(err);
				} else if (result) {
					req.session.userId = user.id;
					console.log(user.id);
	  				res.redirect('/');
				} else {
					res.send('Username and/or password not found, please try again.');
				}
			})
		} else {
			res.send('Username and/or password not found, please try again or register.');
		}
	});	
});

router.get('/register', function(req, res) {
	res.render('auth/register');
});

router.post('/register', function(req, res) {
	//add username, email & password to db
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	bcrypt.hash(password, 10, function(err, hash) {
		db.user.findOrCreate({
			where: {
				username: username
			}, defaults: {
				email: email,
				password: hash
			}
		}).spread(function(user, created) {
			if (created) {
				req.session.userId = user.id;
				res.redirect('/');
			} else {
				req.flash("danger", "user already exists");
				res.send("Username already exists");
			}
		});
	});
});

router.get('/logout', function(req, res) {
	req.session.userId = false;
	res.redirect('/');
});


module.exports = router;