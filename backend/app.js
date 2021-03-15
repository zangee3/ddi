var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()

var logger = require('morgan');
var cors = require("cors");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var txtRouter = require('./routes/txt');
var hostRouter = require("./routes/host");
var mxRouter = require('./routes/mx');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

console.log("ENV---", process.env.SESSION_SECRET);

app.use('/', indexRouter);
// app.use('/auth', authRouter);
app.use('/sso', authRouter);
app.use('/txt', txtRouter);
app.use('/mx', mxRouter);
app.use("/host", hostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
