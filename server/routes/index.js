var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

/* GET home page. */
router.use('/api', apiRouter);




module.exports = router;
