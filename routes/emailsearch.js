var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;


router.get('/', function(req, res, next) {
    res.render('emailsearch');
});

router.post('/', async (req, res, next) => {

  const phone = req.body.phone;

  if(phone.length <= 0) {
      return res.send('전화번호를 입력하세요.');
  }

  try {

    const exphone = await User.findOne({where: {phone}});

    if(exphone) {

        const youremail = await User.findOne({
                            attributes: ['useremail'],
                            where: {
                                phone: exphone
                            }
                        });

        res.send(youremail);

    } else {
        res.send('가입되지 않은 회원입니다.');
    }
 
    } catch(error) {
      console.error(error);
      return next(error);
    }

});        
  
  
 module.exports = router;