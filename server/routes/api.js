var express = require('express');
var router = express.Router();

var employeAPI = require('./api/employe');
var adherentAPI = require('./api/adherent');
var bookAPI = require('./api/book');

//FOR TEST PURPOSE ONLY
var testAPI = require('./api/test');
router.use('/test', testAPI);
//FOR TEST PURPOSE ONLY


router.use('/book', bookAPI);
router.use('/employe', employeAPI);
router.use('/adherent', adherentAPI);

module.exports = router;