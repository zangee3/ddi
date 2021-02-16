var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mysql = require('mysql')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infobloxRouter = require("./routes/infoblox");

var app = express();

const connection = mysql.createConnection({
  host: 'mysql-15664-0.cloudclusters.net',
  user: 'gugu',
  password: 'qy@x$5hFpQ9j',
  database: 'ahmed',
  port: 15664
})

connection.connect(function (err) {
  if(err) throw err
  console.log("You are successfully connted with Database")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/infoblox", infobloxRouter);

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
