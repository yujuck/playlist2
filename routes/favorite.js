var express = require('express');
var router = express.Router();
var Favorite = require('../models/index.js').Favorite;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;
const { verifyToken } = require('./middlewares');

// 상세페이지 렌더링할 때 현재 로그인 되어있는 사용자의 즐겨찾기 상태를 전달해주는 라우터
router.get('/:meetpostId', verifyToken, function (req, res, next) {
  var userid = req.decoded.id;

  Favorite.findOne({
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

// 즐겨찾기 버튼을 누르면 실행되는 라우터.
router.post('/:meetpostId', async (req, res, next) => {

  var meetpostId = req.params.meetpostId;  // 현재 글의 고유 아이디
  var userId = req.body.userId  // 현재 로그인된 사용자의 고유 아이디

  // 현재 글의 아이디와 사용자의 아이디가 같은 favorite DB 데이터를 찾아와서 favorite_data에 저장.
  var favorite_data = await Favorite.findOne({
    attributes: ['state'],
    where: {
      meetpostId: meetpostId,
      userId: userId
    }
  });

  if (favorite_data) {   // 위에서 찾은 데이터가 존재하면 (즐겨찾기 상태가 true인 데이터)
    Favorite.destroy({ where: { meetpostId: meetpostId, userId: userId } })  // 삭제
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } else {  // 데이터가 없으면 (즐겨찾기 해제를 누르면 삭제하기 때문에 데이터 없음)
    Favorite.create({  // 즐겨찾기 상태를 true로 해서 생성
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
  }

});

// 즐겨찾기를 누른 글의 목록을 가져오는 데이터
// router.get('/favoritelist',  function (req, res, next){
//   Favorite.findAll({
//     attributes:['meetpostId'],
//     where: {userId: req.body.userId}
//   })
//   .then((posts) => {
//     res.json(posts);
//   }).catch((err) => {
//     console.error(err);
//     next(err);
//   });
// });


module.exports = router;  