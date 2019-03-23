var express = require('express');
var router = express.Router();

var employeAPI = require('./api/employe');
var bookAPI = require('./api/book');

//FOR TEST PURPOSE ONLY
var testAPI = require('./api/test');
router.use('/test', testAPI);
//FOR TEST PURPOSE ONLY


router.use('/book', bookAPI);
router.use('/employe', employeAPI);


module.exports = router;