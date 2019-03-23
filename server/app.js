require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var passport = require('./auth/passport');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ 
    secret: process.env.SESSION_SECRET || 'secret cats', 
    resave: false, 
    saveUninitialized: false,
    cookie: {maxAge: 15 * 60 * 1000}, 
    rolling: true // Session expires 15 minutes after last request
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
