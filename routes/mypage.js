var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
const bcrypt = require('bcrypt');

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
router.patch('/modifyuser/:id', async(req, res, next)=>{
  const password = req.body.userpw;
 
  const hash = await bcrypt.hash(password, 12);

  User.update(
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