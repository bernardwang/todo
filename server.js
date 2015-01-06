///// setup /////
var express = require('express'); 
var app = express();  
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

///// config /////
var port = process.env.PORT || 3000; 

var db = require('./config/db');
mongoose.connect(db.url); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Failed to connect to mongodb'));
db.once('open', function (callback) {
    console.log('Connected to mongodb');
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Todo = require('./app/models/todo.js');

///// routes /////
require('./app/routes/api.js')(app);
require('./app/routes/index.js')(app);

///// start /////
app.listen(port);
console.log("App listening on port "+port);