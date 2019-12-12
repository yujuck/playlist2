var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;

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

module.exports = router;