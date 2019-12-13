var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//dotenv 팩키지 구성
require('dotenv').config();

// 참여하기 버튼
// axios method 안에 디비 상에 참여
// var Email = require('email').Email
// var myMsg = new Email(
// { from: "me@example.com"
// , to:   "you@example.com"
// , subject: "Knock knock..."
// , body: "Who's there?"
// })

// // if callback is provided, errors will be passed into it
// // else errors will be thrown
// myMsg.send(function(err){
//   console.log(err);
//  })

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var emailsearchRouter = require('./routes/emailsearch');
var meetpostRouter = require('./routes/meetpost');
var categoryRouter = require('./routes/category');
var mypageRouter = require('./routes/mypage');
var yourpageRouter = require('./routes/yourpage');
var fileRouter = require('./routes/file');
var reviewRouter = require('./routes/review');
var favoriteRouter = require('./routes/favorite');
var participantRouter = require('./routes/participant');
var commentRouter = require('./routes/comment');

var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/meetpost', meetpostRouter);
app.use('/category', categoryRouter);
app.use('/emailsearch', emailsearchRouter);
app.use('/mypage', mypageRouter);
app.use('/yourpage', yourpageRouter);
app.use('/file', fileRouter);
app.use('/review', reviewRouter);
app.use('/favorite', favoriteRouter);
app.use('/participant', participantRouter);
app.use('/comment', commentRouter);

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
