var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (userId) {
		db.user.findById(userId).then(function(user) {
			user.getJournals().then(function(journals) {
				console.log(journals);
				res.render('journal/index', {journals: journals});
			});
		});
	} else {
		res.redirect('/auth/login');
	}
});

router.get('/new', function(req, res) {
	if (req.currentUser.username) {
		res.render('journal/new');
	} else {
		res.redirect('/auth/login');
	}
});

router.post('/', function(req, res) {
	var userId = req.currentUser.id;
	var title = req.body.title;
	var place = req.body.place;
	var text = req.body.text;
	db.user.findById(userId).then(function(user) {
		user.createJournal({
			title: title,
			place: place,
			text: text
		}).then(function() {
			res.redirect('/journal');
		});
	});
});


module.exports = router;