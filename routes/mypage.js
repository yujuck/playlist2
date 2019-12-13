var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;
const { verifyToken } = require('./middlewares');

// 사용자 정보 페이지 렌더링
router.get('/', function (req, res, next) {
  res.render('mypage');
});

// 좋아요 목록 페이지 렌더링
router.get('/mypage-good', function (req, res, next) {
  res.render('mypage-good');
});

// 즐겨찾기 목록 페이지 렌더링
router.get('/mypage-favorite', function (req, res, next) {
  res.render('mypage-favorite');
});

// 참여 목록 페이지 렌더링
router.get('/mypage-participant', function (req, res, next) {
  res.render('mypage-participant');
});

// 사용자 정보 수정 페이지 렌더링
router.get('/modifyuser', function (req, res, next) {
  res.render('mypage-modify');
});

router.get('/modifyuser/:id', function(req, res, next) {
  User.findOne({
    where: { id: req.params.id },

  })
  .then((mypage) => {
    res.json(mypage); 
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});

// 글 수정 라우터
router.patch('/modifyuser/:id', verifyToken, function(req, res, next) {
  User.update(
    { 
      userpw : req.body.hash,
      username : req.body.username,
      birth : req.body.birth,
      gender : req.body.gender,
      phone : req.body.phone,
      info : req.body.info,
      photofullroute : req.body.photofullroute
    }, 
    { 
      where: { id: req.params.id } 
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;