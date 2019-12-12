var express = require('express');
var router = express.Router();
var User = require('../models/index.js').User;


router.get('/', function(req, res, next) {
    res.render('emailsearch');
});

router.post('/', async (req, res, next) => {

  const phone = req.body.phone;

  try {

    const exphone = await User.findOne({where: {phone} });

    if(exphone) {

        const youremail = await User.findOne({
                            attributes: ['useremail'],
                            where: {
                                phone: exphone.phone
                            }
                        });
        //console.log(youremail.useremail);

        res.json({
          success: true,
          message: '당신의 이메일은 ' + youremail.useremail +'입니다!'
        })

    } else {
        res.json({
          success: false,
          message: '사용자정보가 없습니다'
        })
    }
 
    } catch(error) {
      console.error(error);
      return next(error);
    }

});  
  
  
 module.exports = router;