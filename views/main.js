var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Make it happen', condition: true, anyArray: [1,2,3] });
});

module.exports = router;

