var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;


router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', async (req, res, next) => {

  const useremail = req.body.useremail;
  const userpw = req.body.userpw;

  if(useremail.length <= 0) {
      res.json({
        success: false,
        message: '이메일을 입력하세요'
    })
  }

  if(userpw.length <= 0) {
      res.json({
        success: false,
        message: '비밀번호를 입력하세요.'
    })
  }
  
  try {

    const exemail = await User.findOne({where: {useremail}});

    if(exemail) {

        const expw = await User.findOne({where: {userpw}});

        if(expw) {
            res.json({
                success: true,
                message: '로그인 성공!'
            })
        } else {
            res.json({
                success: false,
                message: '비밀번호가 틀렸습니다.'
            })
        }

    } else {
        res.json({
            success: false,
            message: '가입되지 않은 회원입니다.'
        })
    }
 
    } catch(error) {
      console.error(error);
      return next(error);
    }

});        
  
  
 module.exports = router;