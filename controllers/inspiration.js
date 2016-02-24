var express = require('express');
var db = require('../models');
var router = express.Router();
var request = require("request");
var Flickr = require("node-flickr");
var keys = {"api_key": process.env.FLICKR_KEY};
flickr = new Flickr(keys);

router.get('/', function(req, res) {
	res.render('inspiration/index');
});

router.post('/', function(req, res) {
	q = req.body.images;
	if (q) {
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
	} else {
		res.send("Please enter a search term.");
	}
});

module.exports = router;
