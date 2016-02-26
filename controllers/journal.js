var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
	var userId = req.currentUser.id;
	if (userId) {
		db.user.findById(userId).then(function(user) {
			user.getJournals().then(function(journals) {
				res.render('journal/index', {journals: journals});
			});
		});
	} else {
		req.flash('danger', 'Please log in to access your Journals');
		res.redirect('/auth/login');
	}
});

router.get('/new', function(req, res) {
	if (req.currentUser.username) {
		res.render('journal/new');
	} else {
		req.flash('danger', 'Please log in to create a new Journal');
		res.redirect('/auth/login');
	}
});

router.get('/:id', function(req, res) {
	var userId = req.currentUser.id;
	var journalId = req.params.id;
	if (userId) {
		db.journal.findById(journalId).then(function(journal) {
			if (journal) {
				if (journal.userId === userId) {
					res.render('journal/show', {journal: journal});
				} else {
					req.flash('danger', 'Only that user can view their journals.');
					res.redirect('/journal');
				}
			} else {
				res.send("Sorry, that Journal wasn't found");
			}
		});
	} else {
		req.flash('danger', 'Please log in to access your journals.');
		res.redirect('/auth/login');
	}
});


router.post('/', function(req, res) {
	var userId = req.currentUser.id;
	if (userId) {
		var title = req.body.title;
		var text = req.body.text;
		db.user.findById(userId).then(function(user) {
			user.createJournal({
				title: title,
				text: text
			}).then(function() {
				res.redirect('/journal');
			});
		});
	} else {
		req.flash('danger', 'Please log in to create a new journal.');
		res.redirect('/auth/login');
	}
});


module.exports = router;