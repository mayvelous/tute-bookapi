var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var Book = require('./models/bookModel');
var Author = require('./models/authorModel');

var bookRoutes = require('./routes/bookRoutes')(Book);
var authorRoutes = require('./routes/authorRoutes')(Author);

var db;
if(process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/bookapi_test');
else
    db = mongoose.connect('mongodb://localhost/bookapi');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.get('/', function(req, res){
    res.send('Welcome to bookapi - Reloadnn!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on port: ' + port);
});

module.exports = app;