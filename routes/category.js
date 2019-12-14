var express = require('express');
var router = express.Router();
var Category = require('../models/index.js').Category;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;
var Intropost = require('../models/index.js').Intropost;

// 카테고리 정보 가져오기
router.get('/', async (req, res) => {
  try {
    var getcate = await Category.findAll();
    return res.json(getcate);
  } catch(err) {
    console.log(err);
  }
});

// 카테고리별 글 리스트 페이지 렌더링
router.get('/categorylist', function(req,res,next) {
    res.render('categorypage');
});

router.get('/recategorylist', function(req,res,next) {
  res.render('recategorypage');
});

// 리스트 데이터 가져오기
router.get('/categorylist/:id', async (req,res) => {
  
  try {
    var catelist = await MeetPost.findAll({
      include: [{ model: Category, }, { model: User}],
      where: {categoryId:req.params.id},
    });
    return res.json(catelist);
  } catch(err) {
    console.log(err);
  }
});

// 리스트 데이터 가져오기(review)
router.get('/recategorylist/:id', async (req,res) => {

  try {
    var getrecatelist = await Intropost.findAll({
      include: [{ model: Category, }, { model: User}],
      where: {categoryId:req.params.id},
    });
    return res.json(getrecatelist);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;