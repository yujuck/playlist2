var express = require('express');
var fs = require('fs');
var MeetPost = require('../models/index.js').MeetPost;
var Intropost = require('../models/index.js').Intropost;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 메인화면 meetpost 리스트
router.get('/bestmeetpost', async(req,res) => {
  try{
    var meetposts = await MeetPost.findAll({
    offset: 0,
    limit: 3,
    order: [['count', 'DESC']]
  });

  return res.json(meetposts);
  } catch(err) {
    console.log(err);
  }  
});

// 메인화면 review 리스트
router.get('/reviewhobby', async(req,res) => {
  try{
    var reviewpost = await Intropost.findAll({
    offset: 0,
    limit: 3,
    order: [['createdAt', 'DESC']]
  });

  return res.json(reviewpost);
  } catch(err) {
    console.log(err);
  }
});
module.exports = router;
