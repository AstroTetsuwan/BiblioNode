var express = require('express');
var router = express.Router();

var Employe = require('../domain/Employe');

router.get('/user', function(req, res, next) {
    var u = new Employe("joe", "jonas",  new Date(), 'M', 15, "n", "uuu ", "e", "002", "bibliothecaire");
    res.json({ data: u });
});


module.exports = router;