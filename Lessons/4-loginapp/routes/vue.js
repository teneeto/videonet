var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('videos/vue');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Vue Videos',
    videoFiles: walkSync,
    videoDir: 'Vue'

  });
});

module.exports = router;
