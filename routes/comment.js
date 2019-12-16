var express = require('express');
var router = express.Router();
var Comment = require('../models/index.js').Comment;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;

// 댓글 가져오기
router.get('/:id', async (req, res) => {

  try {
    var getcomment = await Comment.findAll({
      include: [{ model: MeetPost }, {model: User}],
      where: { meetpostId: req.params.id } 
    });
    return res.json(getcomment);
  } catch(err) {
    console.log(err);
  }
});
  
//댓글 등록
router.post('/:meetpostId', async (req, res) => {
  var meetpostId = req.params.meetpostId;

  try {
    var createcomment = await Comment.create({
      meetpostId: meetpostId,
      userId: req.body.userId,
      comment: req.body.comment,
      createdAt: new Date(),
      where: { id: req.params.id }
    });
    return res.json(createcomment);
  } catch(err) {
    console.log(err);
  }
});

// 댓글 삭제
router.delete('/delete/:id', async (req,res) =>{
  try{
    var deletecomment = await Comment.destroy({where: {id:req.params.id}})
    return res.json(deletecomment);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;