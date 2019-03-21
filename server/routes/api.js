var express = require('express');
var router = express.Router();
var bookAPI = require('./api/book');

router.use('/book', bookAPI);


module.exports = router;