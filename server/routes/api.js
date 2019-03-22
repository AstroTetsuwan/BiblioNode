var express = require('express');
var router = express.Router();

var bookAPI = require('./api/book');

//FOR TEST PURPOSE ONLY
var testAPI = require('./api/test');

router.use('/book', bookAPI);

//FOR TEST PURPOSE ONLY
router.use('/test', testAPI);

module.exports = router;