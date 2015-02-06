var express  = require('express');
var app      = express();
var port     = process.env.PORT || 5000;
var bodyParser   = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

//for sessions
//var session      = require('express-session');
//var cookieParser = require('cookie-parser');

//config
require('../config/global');
var configDB = require('../config/database.js');
mongoose.connect(configDB.url);

//install middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})) // get information from html forms
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

require('./routes.js')(app);

module.exports = app


