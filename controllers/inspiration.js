var express = require('express');
var db = require('../models');
var router = express.Router();
var request = require("request");
var Flickr = require("node-flickr");
var keys = {"api_key": "200a75e4675a7972d2294fd3e79014a8"}
flickr = new Flickr(keys);

router.get('/', function(req, res) {
	res.render('inspiration/index');
});

router.post('/', function(req, res) {
	q = req.body.images;
	flickr.get("photos.search", {
		"sort": "relevance",
		"text": q
	}, function(err, result) {
    	var pictures = result.photos.photo;
    	if (err) {
    		res.send(err);
    	} else {
    		res.render('inspiration/slideshow', {pictures: pictures, q: q});
		}
	});
});

module.exports = router;
