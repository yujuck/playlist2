var express = require('express');
var router = express.Router();
var Participants = require('../models/index.js').Participants;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;
const { verifyToken } = require('./middlewares');
var nodemailer = require('nodemailer');

// 상세페이지 렌더링할 때 현재 로그인 되어있는 사용자의 참여하기 상태를 전달해주는 라우터
router.get('/:meetpostId', verifyToken, function (req, res, next) {
  
  var userid = req.decoded.id;

  Participants.findOne({
    attributes: ['state'],
    where: {
      userId: userid,
      meetpostId: req.params.meetpostId
    }
  })
    .then((fav) => {
      res.json(fav);
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  
});

// 참여하기 버튼을 누르면 실행되는 라우터.
router.post('/:meetpostId', async (req, res, next) => {

  var meetpostId = req.params.meetpostId;  // 현재 글의 고유 아이디
  var userId = req.body.userId  // 현재 로그인된 사용자의 고유 아이디

  // 현재 글의 아이디와 사용자의 아이디가 같은 favorite DB 데이터를 찾아와서 favorite_data에 저장.
  var participant_data = await Participants.findOne({
    attributes: ['state'],
    where: {
      meetpostId: meetpostId,
      userId: userId
    }
  });

  if (participant_data) {   // 위에서 찾은 데이터가 존재하면 (즐겨찾기 상태가 true인 데이터)
    Participants.destroy({ where: { meetpostId: meetpostId, userId: userId } })  // 삭제
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });

      //메일보내기
      try {
        //참여자 이메일 찾기
        const partiemail = await User.findOne({
                            attributes: ['useremail'],
                            where: {
                              id: userId
                            }
                        });
        console.log('참여자 이메일: ' + partiemail.useremail);
        
        //게시글 이름 찾기
        const postname = await MeetPost.findOne({
          attributes: ['title'],
          where: {
            id: meetpostId
          }
         });
        console.log('게시글 이름: ' + postname.title);

        //작성자 이름 찾기
        const userresult = await MeetPost.findOne({
          attributes: ['userId'],
          where: {
              id: meetpostId
          }
        });

        if(userresult.userId) {
    
            const writeemail = await User.findOne({
                                attributes: ['useremail'],
                                where: {
                                    id: userresult.userId
                                }
                            });
            console.log('작성자 이메일: ' + writeemail.useremail); 
            
            //메일보내기
            var transporter = nodemailer.createTransport({
              service:'gmail',
              auth: {
                  user : 'playlist1217@gmail.com',
                  pass : 'ppk1217!'
              }
            });
          
            var mailOption = {
                from : 'playlist1217@gmail.com',
                to : writeemail.useremail,
                subject : '[Playlist] 참여 취소 안내',
                text : '[Playlist]\n\n 안녕하세요. 취미 공유 플랫폼 Playlist 입니다.\n [' + partiemail.useremail + '] 님이 [' + postname.title + '] 참여를 취소하였습니다.'
            };
            
            transporter.sendMail(mailOption, function(err, info) {
                if ( err ) {
                    console.error('Send Mail error : ', err);
                }
                else {
                    console.log('Message sent : ', info);
                }
            });
            
        }

    } catch(error) {
        console.error(error);
        return next(error);
    }


  } else {  // 데이터가 없으면 (즐겨찾기 해제를 누르면 삭제하기 때문에 데이터 없음)
    Participants.create({  // 즐겨찾기 상태를 true로 해서 생성
      meetpostId: meetpostId,
      userId: userId,
      state: req.body.state
    }).then((result) => {
      res.json(result);
    })
      .catch((err) => {
        console.error(err);
        next(err);
      });

      //메일보내기
      try {
        //참여자 이메일 찾기
        const partiemail = await User.findOne({
                            attributes: ['useremail'],
                            where: {
                              id: userId
                            }
                        });
        console.log('참여자 이메일: ' + partiemail.useremail);
        
        //게시글 이름 찾기
        const postname = await MeetPost.findOne({
          attributes: ['title'],
          where: {
            id: meetpostId
          }
         });
        console.log('게시글 이름: ' + postname.title);

        //작성자 이름 찾기
        const userresult = await MeetPost.findOne({
          attributes: ['userId'],
          where: {
              id: meetpostId
          }
        });

        if(userresult.userId) {
    
            const writeemail = await User.findOne({
                                attributes: ['useremail'],
                                where: {
                                    id: userresult.userId
                                }
                            });
            console.log('작성자 이메일: ' + writeemail.useremail); 
            
            //메일보내기
            var transporter = nodemailer.createTransport({
              service:'gmail',
              auth: {
                  user : 'playlist1217@gmail.com',
                  pass : 'ppk1217!'
              }
            });
          
            var mailOption = {
                from : 'playlist1217@gmail.com',
                to : writeemail.useremail,
                subject : '[Playlist] 참여 안내',
                text : '[Playlist]\n\n 안녕하세요. 취미 공유 플랫폼 Playlist 입니다.\n [' + partiemail.useremail + '] 님이 [' + postname.title + ']에 참여하였습니다.'
            };
            
            transporter.sendMail(mailOption, function(err, info) {
                if ( err ) {
                    console.error('Send Mail error : ', err);
                }
                else {
                    console.log('Message sent : ', info);
                }
            });
            
        }

    } catch(error) {
        console.error(error);
        return next(error);
    }



  }

});

router.get('/participantlist', verifyToken, function (req, res, next){
  Participants.findOne({
    attributes:['meetpostId'],
    where: {userId: req.decoded.id}
  })
  .then((posts) => {
    res.json(posts);
  }).catch((err) => {
    console.error(err);
    next(err);
  });
});


module.exports = router;  