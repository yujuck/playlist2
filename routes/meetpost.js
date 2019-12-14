var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;
var Comment = require('../models/index').Comment;
var Favorite = require('../models/index').Favorite;
var Participants = require('../models/index').Participants;
const { verifyToken } = require('./middlewares');

// 글 작성 페이지 렌더링
router.get('/writepage', function (req, res) {
  res.render('post-write');
});

// 작성한 글 데이터를 DB에 저장
router.post('/write', verifyToken, async (req, res) => {
  try {
    var createPost = await MeetPost.create({
      categoryId: req.body.categoryId,
      title: req.body.title,
      headcount: req.body.headcount,
      participants: 0,
      age: req.body.age,
      record: req.body.record,
      content: req.body.content,
      good: 0,
      count: 0,
      meetphoto: req.body.meetphoto,
      userId: req.decoded.id,
      createdAt: new Date
    });
    return res.json(createPost);
  } catch (err) {
    console.log(err);
  }

});


// 전체글 리스트 페이지 렌더링
router.get('/', function (req, res, next) {
  res.render('post-list');
});

// 전체글 가져오는 라우터
router.get('/list', async (req, res) => {
  try {
    var postlist = await MeetPost.findAll({
      include: [{ model: Category, }, { model: User }]
    });
    return res.json(postlist);
  } catch (err) {
    console.log(err);
  }

});

// 조회수 라우터
router.get('/counts/:id', async (req, res) => {

  var counts = await MeetPost.findOne({
    attributes: ['count'],
    where: { id: req.params.id }
  });

  var countup = counts.count + 1;
  try {
    await MeetPost.update(
      {
        count: countup
      },
      {
        where: { id: req.params.id }
      }
    );

    var updatecount = await MeetPost.findOne({
      attributes: ['count'],
      where: { id: req.params.id }
    });
    return res.json(updatecount.count);
  } catch (err) {
    console.log(err);
  }
});

// 상세글 페이지 렌더링
router.get('/detailpost', function (req, res, next) {
  res.render('detailpost');
});

// 상세글 가져오는 라우터
router.get('/detail/:id', async (req, res) => {

  try {
    var detailpost = await MeetPost.findOne({
      include: [{ model: Category, }, { model: User }],
      where: { id: req.params.id }
    });
    return res.json(detailpost);
  } catch (err) {
    console.log(err);
  }

});

// 글 수정 페이지 렌더링
router.get('/modify', function (req, res, next) {
  res.render('post-modify');
});


// 해당 글 정보 불러오기
router.get('/modify/:id', async (req, res) => {
  try {
    var meetpost = await MeetPost.findOne({
      include: [{ model: Category, }, { model: User }],
      where: { id: req.params.id }
    });
    return res.json(meetpost);
  } catch (err) {
    console.log(err);
  }

});

// 글 수정 라우터
router.patch('/modify/:id', verifyToken, async (req, res) => {
  try {
    var modifypost = await MeetPost.update(
      {
        categoryId: req.body.categoryId,
        title: req.body.title,
        headcount: req.body.headcount,
        age: req.body.age,
        record: req.body.record,
        content: req.body.content,
        meetphoto: req.body.photo,
        userId: req.decoded.id,
      },
      {
        where: { id: req.params.id }
      });
    return res.json(modifypost);
  } catch (err) {
    console.log(err);
  }
});

// 글 삭제
router.delete('/delete/:id', async (req, res) =>  {
  try{
    var deletecomment = await Comment.destroy({ where: { meetpostId: req.params.id }});
    var deletefavorite = await Favorite.destroy({ where: { meetpostId: req.params.id }});
    var deleteparticipant = await Participants.destroy({ where: { meetpostId: req.params.id }});
    var deletepost = await MeetPost.destroy({ where: { id: req.params.id } });
    return res.json(deletepost);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;