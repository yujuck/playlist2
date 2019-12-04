var express = require('express');
var router = express.Router();
var Category = require('../models/index.js').Category;

router.get('/', (req, res, next) => {
    Category.findAll()
    .then((categories) => {
        // 전체 카테고리 데이터 조회 JSON으로 리턴
        res.json(categories);
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});

module.exports = router;