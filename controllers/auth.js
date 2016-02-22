var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/login', function(req, res) {
	res.render('auth/login');
});

router.post('/login', function(req, res) {
	//collect user info & check against DB
	var username = req.body.username;
	var password = req.body.password;
	res.send("Hello, "+username);
});

router.get('/register', function(req, res) {
	res.render('auth/register');
});

router.post('/register', function(req, res) {
	//add username, email & password to db
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	db.user.findOrCreate({
		where: {
			username: username
		}, defaults: {
			email: email,
			password: password
		}
	}).spread(function(user, created) {
		if (created) {
			res.send("Username: "+username+", Email: "+email+", Password: "+password);
		} else {
			res.send("Username already exists");
		}
	});
	
});

module.exports = router;