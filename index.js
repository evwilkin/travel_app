var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render("index");
});

app.use('/auth', require('./controllers/auth'));

app.use('/wishlist', require('./controllers/wishlist'));

app.listen(3000);