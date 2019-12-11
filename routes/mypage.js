var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;

// 글 작성 페이지 렌더링
router.get('/', function (req, res, next) {
  res.render('mypage');
});

// router.get('/uploads', function(req,res){
//   fs.readFile('user.photofullroute', function(error,data){
//     res.writeHead(200, {'Content-Type' : 'text/html'});
//     res.end(data);
//   });
// })
module.exports = router;