var express = require('express');
var router = express.Router();
var Comment = require('../models/index.js').Comment;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;

// 댓글 가져오기
router.get('/:id', function(req, res, next) {
    Comment.findAll({
      include: [{ model: MeetPost }, {model: User}],
      where: { meetpostId: req.params.id } 
    })
    .then((posts) => {
      res.json(posts); 
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  });
  
  //댓글 등록
  router.post('/:meetpostId', function(req, res, next) {
  
    var meetpostId = req.params.meetpostId;
  
    Comment.create({
      meetpostId: meetpostId,
      userId: req.body.userId,
      comment: req.body.comment,
      createdAt: new Date,
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