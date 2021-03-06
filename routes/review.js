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
router.post('/review-write', verifyToken, async (req, res) => {

  try{
    var createreview = await Intropost.create({
      categoryId: req.body.categoryId,
      userId: req.decoded.id,
      title: req.body.title,
      introphoto: req.body.introphoto,
      content: req.body.content,
      createdAt:new Date()
    });
    return res.json(createreview);
  } catch(err) {
    console.log(err);
  }
});

// 전체글 리스트 페이지 렌더링
router.get('/', function(req, res, next) {
  res.render('review-list');
});

// 전체글 가져오는 라우터
router.get('/review-list', async (req, res) => {

  try {
    var reviewlist = await Intropost.findAll({
      include: [{ model: Category, }, { model: User}]
    });
    return res.json(reviewlist);
  } catch(err) {
    console.log(err);
  }
});

// 상세글 페이지 렌더링
router.get('/detailpost', function(req, res, next) {
  res.render('review-detailpost'); 
});

// 상세글 가져오는 라우터
router.get('/detail/:id', async (req, res) => {
  try {
    var reviewdetail = await Intropost.findOne({
      include: [{ model: Category, }, { model: User}],
      where: { id: req.params.id } 
    });
    return res.json(reviewdetail);
  } catch(err) {
    console.log(err);
  }
});

// 글 수정
router.get('/modify', function(req,res,next) {
  res.render('review-modify');
});


// 해당 글 정보 불러오기
router.get('/modify/:id', async (req, res) => {

  try {
    var intropost = await Intropost.findOne({
      include: [{ model: Category, }, { model: User}],
      where: { id: req.params.id } 
    });
    return res.json(intropost);
  } catch(err) {
    console.log(err);
  }
});

// 글 수정 라우터
router.patch('/moim/modify/:id', verifyToken, async (req, res) => {
  
  try {
    var modifyintro = await Intropost.update(
      { 
        categoryId: req.body.categoryId,
        title: req.body.title,
        content: req.body.content,
        introphoto: req.body.introphoto,
        userId: req.decoded.id,
      }, 
      { 
        where: { id: req.params.id } 
    });
    return res.json(modifyintro);
  } catch(err) {
    console.log(err);
  }
});

// 글 삭제
router.delete('/delete/:id', async (req, res) => {
  
  try {
    var deleteintro = await Intropost.destroy({ where: { id: req.params.id } });
    return res.json(deleteintro);
  } catch(err) {
    console.log(err);
  }

});

module.exports = router;
