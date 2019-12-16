var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var MeetPost = require('../models/index.js').MeetPost;
var Intropost = require('../models/index.js').Intropost;
const bcrypt = require('bcrypt');
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

// 작성 목록 페이지 렌더링
router.get('/mypage-write', function(req,res) {
  res.render('mypage-write');
});

// 내가 쓴 meetpost 데이터
router.get('/mymeetpost', verifyToken, async (req,res) => {
  try{ 
    var mymeetpost = await MeetPost.findAll({
      where: { userId: req.decoded.id },
    });
    return res.json(mymeetpost);
  } catch(err) {
    console.log(err);
  }
});

// 내가 쓴 review 데이터
router.get('/myreview', verifyToken, async (req,res) => {
  try{ 
    var myreview = await Intropost.findAll({
      where: { userId: req.decoded.id },
    });
    return res.json(myreview);
  } catch(err) {
    console.log(err);
  }
});

// 사용자 정보 수정 페이지 렌더링
router.get('/modifyuser', function (req, res, next) {
  res.render('mypage-modify');
});

// 수정할 때 기존 회원정보 가져오는 라우터
router.get('/modifyuser/:id', async (req, res) => {

  try {
    var modiuser = await User.findOne({
      where: { id: req.params.id },
    });
    return res.json(modiuser);
  } catch(err) {
    console.log(err);
  }
});

// 회원정보 수정 라우터
router.post('/modifyuser/:id', async(req, res, next)=>{
  const password = req.body.userpw;
 
  const hash = await bcrypt.hash(password, 12);

  try {
    var modiuser = await User.update(
    { 
      userpw : hash,
      username : req.body.username,
      birth : req.body.birth,
      gender : req.body.gender,
      phone : req.body.phone,
      info : req.body.info,
      photofullroute : req.body.photofullroute
    }, 
    { 
      where: { id: req.params.id } 
    });

    return res.json(modiuser);
  } catch(err) {
    console.log(err);
  }
  
});

module.exports = router;