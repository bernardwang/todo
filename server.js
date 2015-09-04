///// setup /////

// initialize middleware
var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    
// initialize express
var app = express(),
    port = process.env.PORT || 3000; 

// connect with mongoose database
var db = require('./config/db');
mongoose.connect(db.url); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to mongodb'));
db.once('open', function (callback) {
    console.log('Connected to mongodb');
});

// use middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(methodOverride());

///// routes /////

var router = express.Router();  
app.use('/api', router); // restful api

require('./app/routes/api.js')(app);
require('./app/routes/index.js')(app);

///// start /////

app.listen(port);
console.log("App listening on port "+port);