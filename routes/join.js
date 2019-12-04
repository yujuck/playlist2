var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;
var Usercateogory = require('../models/usercategory').Usercateogory;


router.get('/', function(req, res, next) {
    res.render('join');
});
    

router.post('/', async (req, res, next) => {

  try {

    const useremail = req.body.useremail;
    const userpw = req.body.userpw;
    const userpwre = req.body.userpwre;
    const username = req.body.username;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const info = req.body.info;
    const photofullroute = req.body.photofullroute;
   

      if(useremail.length <= 0) {
        res.json({
          success: false,
          message: '이메일을 입력해주세요.'
      })
      }
      if(userpw.length <= 0) {
        res.json({
          success: false,
          message: '비밀번호를 입력해주세요.'
        })
      }
      if(userpw.length < 7) {
        res.json({
          success: false,
          message: '비밀번호는 7글자 이상 적어주세요.'
        })
      }
      if(userpw != userpwre) {
        res.json({
          success: false,
          message: '비밀번호가 일치하지 않습니다.'
        })
      }
      if(username.length <= 0) {
        res.json({
          success: false,
          message: '이름을 입력해주세요.'
        })
      }
      if(birth.length != 6) {
        res.json({
          success: false,
          message: '생년월일을 올바르게 입력해주세요.'
        })
      }
      if(phone.length != 11) {
        res.json({
          success: false,
          message: '전화번호를 올바르게 입력해주세요.'
        })
      }
        
        await User.create({
          useremail: useremail,
          userpw: userpw,
          username: username,
          birth: birth,
          gender: gender,
          phone: phone,
          info: info,
          photofullroute: photofullroute,
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
    //}
 
  } catch(error) {
      console.error(error);
      return next(error);
    }
    
});

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
  
  
 module.exports = router;