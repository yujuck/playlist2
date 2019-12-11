var express = require('express');

//단방향 암호화(복호화가 안되는) 노드팩키지 참조
const bcrypt = require('bcrypt');
//JWT 인증토큰 노드 팩키지 라이브러리 참조
const jwt = require('jsonwebtoken');
//모든 라우팅 모듈에서 토큰 기반 인증처리를  공통처리 해주는 부분
const { verifyToken } = require('./middlewares');

var User = require('../models/index.js').User;
var Usercateogory = require('../models/usercategory').Usercateogory;

var router = express.Router();

//회원가입(화면)
router.get('/join', function(req, res, next) {
    res.render('join');
});

//회원가입(데이터)
//localhost:3000/user/join
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


      const exemail = await User.findOne({where: {useremail}});

      if(exemail) {
        res.json({
          success: false,
          message: '이메일 중복확인을 해주세요.'
        })
      } else {
        
        //단방향 암호화를 통해 난독화 및 복호화불가한 문자열로 변환
        const hash = await bcrypt.hash(req.body.userpw, 12);
        
        await User.create({
          useremail: useremail,
          userpw: hash,
          username: username,
          birth: birth,
          gender: gender,
          phone: phone,
          info: info,
          photofullroute: photofullroute,
          createdAt: new Date
        })
        .then((result) => {
          res.json({
            success: true,
            message: '회원가입 성공!'
          })
        })
        .catch((err) => {
            next(err);
        });
      }
 
    } catch(error) {
        console.error(error);
        return next(error);
      }
    
});

//이메일 중복체크
router.post('/double_check', async (req, res, next) => {

  const useremail = req.body.useremail;

  const exemail = await User.findOne({where: {useremail}});

    if(exemail) {
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

//로그인(화면)
router.get('/login', function(req, res, next) {
    res.render('login');
});


//로그인(데이터) - 토큰 기반
//localhost:3000/user/login
router.post('/login', async (req, res, next) => {

  try
  {
    //동일 메일 아이디 사용자 정보 조회
    const exemail = await User.findOne(
      {
        attributes:['id','useremail','userpw','username','birth','gender','phone'], 
        where: { useremail:req.body.useremail } 
      });

    if (exemail) {
      console.log("로그인 사용자정보", exemail);

      //DB 암호와 사용자 암호 비교
      const result = await bcrypt.compare(req.body.userpw, exemail.userpw);
      console.log("결과", result);
      console.log("JWT_SECRET", process.env.JWT_SECRET);
      
      //로그인 사용자의 아이디/암호가 일치하는 정상사용자 인경우 인증토큰 발급
      if(result)
      {
        //토큰 생성
        const token = jwt.sign({
          id: exemail.id,  // user의 고유 아이디만 토큰에 저장
          // useremail: exemail.useremail,
          // username:exemail.username,
        }, process.env.JWT_SECRET, {
          expiresIn: '10m',  // 유효시간
          issuer: 'webzine',
        });

        //토큰 발급처리
        return res.json({
            code:200,
            result:token 
          });

      } else{
          return res.json({
            code:500,
            message:'암호정보가 일치하지 않습니다.' 
          });
      }
    }
    else
    {  
      return res.json({
        code:500,
        message:'사용자 정보가 존재하지 않습니다.' 
      });
    }
  } catch(err){
      console.error(err);
      return next(err);
  }
});

//내개인정보조회
router.get('/profile',verifyToken, async (req, res) => {
  console.log("아이디: ",req.decoded.id);
  try
  {
    const user = await User.findOne({
      attributes:['useremail','username','birth','phone','photofullroute'],
      where:{
        id:req.decoded.id,
      }     
    });
    if(user){
      return res.json({
        code:200,
        result:user 
      });
    }else{
      return res.json({
        code:500,
        message:'사용자 정보가 존재하지 않습니다.' 
      });

    }
  }catch(err){
    console.log(error);
    return res.status(500).json({ code:500,message:'서버에러발생'});
  }

});
 
// 토큰 유효성 검사
router.get('/checktoken', async (req, res) => {
  try {

    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return res.json({
      tokenvalue: req.decoded.id,
    });

  } catch (error) {

    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }

    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
});

// router.get("/img", (req, res) => {
//   res.sendFile(path.join(__dirname, "./img"));
// });

 module.exports = router;