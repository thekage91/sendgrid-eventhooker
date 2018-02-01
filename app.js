var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var db = require('./config/db');
var index = require('./routes/index');
var users = require('./routes/users');

// Bootstrap application models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function(file){
  require(path.join(modelsPath, file));
});

// Bootstrap application api
var apisPath = path.join(__dirname, 'api');
fs.readdirSync(apisPath).forEach(function(file){
  app.use('/api', require(path.join(apisPath, file)));
});

// Bootstrap webhook application
var webhookPath = path.join(__dirname, 'webhook');
fs.readdirSync(webhookPath).forEach(function(file){
  app.use('/webhook', require(path.join(webhookPath, file)));
});
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
