var express = require('express');
var router = express.Router();

var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;

const { verifyToken } = require('./middlewares');


// 글 작성 페이지 렌더링
router.get('/writepage', function (req, res, next) {
  res.render('post-write');
});

// 작성한 글 데이터를 DB에 저장
router.post('/write', verifyToken, function (req, res, next) {
  MeetPost.create({
    categoryId: req.body.categoryId,
    title: req.body.title,
    headcount: req.body.headcount,
    participants: 0,
    age: req.body.age,
    record: req.body.record,
    content: req.body.content,
    good: 0,
    count: 0,
    meetphoto: req.body.photo,
    userId: req.decoded.id,
    createdAt: new Date
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
router.get('/', function (req, res, next) {
  res.render('post-list');
});

// 전체글 가져오는 라우터
router.get('/list', function (req, res, next) {
  MeetPost.findAll({
    include: [{ model: Category, }, { model: User }]
  })
    .then((posts) => {
      res.json(posts);
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

// 상세글 페이지 렌더링
router.get('/detailpost', function (req, res, next) {
  res.render('detailpost');
});

// 상세글 가져오는 라우터
router.get('/detail/:id', function (req, res, next) {
  MeetPost.findOne({
    include: [{ model: Category, }, { model: User }],
    where: { id: req.params.id }
  })
    .then((posts) => {
      res.json(posts);
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

// 글 수정
router.get('/modify', function (req, res, next) {
  res.render('post-modify');
});


// 해당 글 정보 불러오기
router.get('/modify/:id', function (req, res, next) {
  MeetPost.findOne({
    include: [{ model: Category, }, { model: User }],
    where: { id: req.params.id }
  })
    .then((posts) => {
      res.json(posts);
    }).catch((err) => {
      console.error(err);
      next(err);
    });
});

// 글 수정 라우터
router.patch('/modify/:id', verifyToken, async (req, res, next) =>{
  try {
    const meetpost = await MeetPost.update({
      categoryId: req.body.categoryId,
      title: req.body.title,
      headcount: req.body.headcount,
      // participants: 0,
      age: req.body.age,
      record: req.body.record,
      content: req.body.content,
      meetphoto: req.body.photo,
      userId: req.decoded.id,
    },
      {
        where: { id: req.params.id }
      });

    return res.json(meetpost);
  } catch(err) {
    console.log(err);
  }

});

// 글 삭제
router.delete('/delete/:id', function (req, res, next) {
  MeetPost.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
module.exports = router;
