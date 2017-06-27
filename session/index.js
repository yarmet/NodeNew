/**
 * Created by ruslan on 25.06.2017.
 */
var config = require('../config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var database = require('../database');

var sessionStore = new MongoStore({mongooseConnection: database.connection});

module.exports = session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    resave: true,
    saveUninitialized: true,
    store: sessionStore
});