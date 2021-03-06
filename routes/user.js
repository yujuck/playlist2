var express = require('express');
const passport = require('passport');
//단방향 암호화(복호화가 안되는) 노드팩키지 참조
const bcrypt = require('bcrypt');
//JWT 인증토큰 노드 팩키지 라이브러리 참조
const jwt = require('jsonwebtoken');
//모든 라우팅 모듈에서 토큰 기반 인증처리를  공통처리 해주는 부분
const { verifyToken } = require('./middlewares');
const { isLoggedIn } = require('./middlewares');
var nodemailer = require('nodemailer');

var User = require('../models/index.js').User;
var MeetPost = require('../models/index.js').MeetPost;
var Intropost = require('../models/index.js').Intropost;
var Comment = require('../models/index.js').Comment;
var Favorite = require('../models/index.js').Favorite;
var Participants = require('../models/index.js').Participants;

var router = express.Router();

//회원가입(데이터)
router.post('/join', async (req, res, next) => {

  try {

    const useremail = req.body.useremail;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const info = req.body.info;
    const photofullroute = req.body.photofullroute;


    const exemail = await User.findOne({ where: { useremail } });

    if (exemail) {
      res.json({
        success: false,
        message: '이메일 중복확인을 해주세요.'
      })
    } else {

      //단방향 암호화를 통해 난독화 및 복호화불가한 문자열로 변환
      const hash = await bcrypt.hash(userpw, 12);

      await User.create({
        useremail: useremail,
        userpw: hash,
        username: username,
        birth: birth,
        gender: gender,
        phone: phone,
        info: info,
        photofullroute: photofullroute,
        createdAt: new Date()
      })
        .then((result) => {
          res.json({
            success: true,
            message: '회원가입 성공!'
          })
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });

      //회원가입시 메일보내기(보내는 사람만 gmail이면 됨)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'playlist1217@gmail.com',
          pass: 'ppk1217!'
        }
      });

      var mailOption = {
        from: 'playlist1217@gmail.com',
        to: useremail,
        subject: '[Playlist] ' + useremail + ' 님 회원가입을 축하합니다!',
        html: '<h3>[취미 공유 플랫폼 Playlist]<h3><p><img src="https://playlistweb.azurewebsites.net//images/sign_up_image.jpg" ></p><br>' + useremail + '님 회원가입을 축하합니다!<br> Playlist에서 당신의 취미를 공유해보세요:)'
      };

      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.error('Send Mail error : ', err);
        }
        else {
          console.log('Message sent : ', info);
        }
      });
    }

  } catch (error) {
    console.error(error);
    return next(error);
  }

});

//이메일 중복체크
router.post('/double_check', async (req, res, next) => {

  const useremail = req.body.useremail;

  const exemail = await User.findOne({ where: { useremail } });

  if (exemail) {
    res.json({
      success: false,
      message: '이미 가입된 이메일입니다.'
    })
  } else {
    res.json({
      success: true,
      message: '사용 가능한 이메일입니다.'
    })
  }

});

//로그인(데이터) - 토큰 기반
//localhost:3000/user/login
router.post('/login', async (req, res, next) => {

  try {
    //동일 메일 아이디 사용자 정보 조회
    const exemail = await User.findOne(
      {
        attributes: ['id', 'useremail', 'userpw', 'username', 'birth', 'gender', 'phone', 'photofullroute'],
        where: { useremail: req.body.useremail }
      });

    if (exemail) {
      //DB 암호와 사용자 암호 비교
      const result = await bcrypt.compare(req.body.userpw, exemail.userpw);

      //로그인 사용자의 아이디/암호가 일치하는 정상사용자 인경우 인증토큰 발급
      if (result) {
        //토큰 생성
        const token = jwt.sign({
          id: exemail.id,  // user의 고유 아이디만 토큰에 저장
          // useremail: exemail.useremail,
          // username:exemail.username,
        }, process.env.JWT_SECRET, {
          expiresIn: '120m',  // 유효시간
          issuer: 'webzine',
        });

        //토큰 발급처리
        return res.json({
          code: 200,
          result: token
        });

      } else {
        return res.json({
          code: 500,
          message: '암호정보가 일치하지 않습니다.'
        });
      }
    }
    else {
      return res.json({
        code: 500,
        message: '사용자 정보가 존재하지 않습니다.'
      });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

//내개인정보조회
router.get('/profile', verifyToken, async (req, res) => {

  try {
    const user = await User.findOne({
      attributes: ['useremail', 'username', 'birth', 'phone', 'photofullroute', 'info'],
      where: {
        id: req.decoded.id,
      }
    });
    if (user) {
      return res.json({
        code: 200,
        result: user
      });
    } else {
      return res.json({
        code: 500,
        message: '사용자 정보가 존재하지 않습니다.'
      });

    }
  } catch (err) {
    console.log(error);
    return res.status(500).json({ code: 500, message: '서버에러발생' });
  }

});

//사용자 로그인 필요여부 체크 기능
router.get('/checkLogin', verifyToken, async (req, res) => {
  try {
    //기존에 발급한 토큰이 유효한 경우 토큰내 사용자정보 조회(사용자고유번호,메일,이름)
    var loginUser = req.decoded;

    if (loginUser) {
      return res.json({
        code: 200,
        result: loginUser
      });
    } else {
      return res.json({
        code: 500,
        message: '토큰정보가 유효하지 않습니다.재로그인이 필요합니다.'
      });

    }
  } catch (err) {
    console.log(error);
    return res.status(500).json({ code: 500, message: '서버에러발생' });
  }

});

// 회원탈퇴
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    var deletemeetpost = await MeetPost.destroy({ where: { userId: req.params.id } });
    var deleteintropost = await Intropost.destroy({ where: { userId: req.params.id } });
    var deletecomment = await Comment.destroy({ where: { userId: req.params.id } });
    var deletefavorite = await Favorite.destroy({ where: { userId: req.params.id } });
    var deleteparticipant = await Participants.destroy({ where: { userId: req.params.id } });
    var deleteuser = await User.destroy({ where: { id: req.params.id } });
    return res.json(deleteuser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;