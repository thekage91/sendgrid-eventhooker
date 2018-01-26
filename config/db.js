'use strict';

var mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var config = {};

if(env === 'development' || env === 'test' || env === 'production') {
  config = {
    "db": "sendgrid-eventhooker-db",  
    "host": process.env.DATABASE_HOST || "127.0.0.1",  
    "user": "",
    "pw": "",
    "port": process.env.DATABASE_PORT || "27017"
  }
}

if(env === 'production') {
  config = {
    "db": "sendgrid-eventhooker-db",  
    "host": process.env.DATABASE_HOST || "127.0.0.1",  
    "user": "",
    "pw": "",
    "port": process.env.DATABASE_PORT || "27017"
  }
}

var port = (config.port.length > 0) ? ":" + config.port : '';
var login = (config.user.length > 0) ? config.user + ":" + config.pw + "@" : '';

var uristring =  "mongodb://" + login + config.host + port + "/" + config.db;
var mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if(err){
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  }else{
    console.log('Successfully connected to: ' + 'mongodb://' + config.host + port + "/" + config.db);
  }
});

exports.mongoose = mongoose;