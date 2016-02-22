var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('wishlist/index');
});

router.get('/:id', function(req, res) {
	res.render('wishlist/show');
});

router.post('/', function(req, res) {
	res.redirect('/');
});

module.exports = router;