var express = require('express');
var router = express.Router();
var MeetPost = require('../models/index.js').MeetPost;
var Category = require('../models/index.js').Category;
var User = require('../models/index.js').User;

router.get('/', function (req, res, next) {
  res.render('yourpage');
});
  
  
router.get('/:id', function(req, res, next) {

    User.findOne({
      where: { id: req.params.id } 
    })
    .then((posts) => {
      res.json(posts); 
    }).catch((err) => {
      console.error(err);
      next(err);
    });
  });

module.exports = router;