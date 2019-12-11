var express = require('express');
var router = express.Router();

var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;
var Intropost = require('../models/index.js').Intropost;

const { verifyToken } = require('./middlewares');

// 글 작성 페이지 렌더링
router.get('/review-writepage', function (req, res, next) {
  res.render('review-write');
});

// 작성한 글 데이터를 DB에 저장
router.post('/review-write', verifyToken, function (req, res, next) {
  console.log("사용자아이디", req.decoded.id);
    Intropost.create({
      categoryId: req.body.categoryId,
      userId: req.decoded.id,
      title: req.body.title,
      content: req.body.content,
      createdAt:new Date
    })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
});


// 전체글 리스트 페이지 렌더링
router.get('/', function(req, res, next) {
  res.render('review-list');
});

// 전체글 가져오는 라우터
router.get('/review-list', function (req, res, next) {
    Intropost.findAll({
      include: [{ model: Category, }, { model: User}]
    })
    .then((reviews) => {
      res.json(reviews);    //여기 원래 ejs에서 posts 사용했었는데, reviews로 바꿈!!
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
