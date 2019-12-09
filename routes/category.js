var express = require('express');
var router = express.Router();
var Category = require('../models/index.js').Category;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;

router.get('/', (req, res, next) => {
    Category.findAll()
    .then((categories) => {
        // 전체 카테고리 데이터 조회 JSON으로 리턴
        res.json(categories);
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});


// 카테고리별 글 리스트 
router.get('/categorylist', function(req,res,next) {
    res.render('categorypage');
});

router.get('/categorylist/:id', function(req,res,next) {
    MeetPost.findAll({
      include: [{ model: Category, }, { model: User}],
      where: {categoryId:req.params.id},
    //   order:[['id','DESC']] 
    })
    .then((posts) => {
        console.log(posts);
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
  });
  

module.exports = router;