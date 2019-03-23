var express = require('express');
var router = express.Router();

var apiRouter = require('./api');


/* GET home page. */
router.get('/', (req, res, next) => {
    
    res.json({data: "Page qui sert une page avec un lien vers les deux apps!"});
});

router.get('/adherent', (req, res, next) => {
    res.json({data: "Page qui sert l'app React adhérent!"});
});

router.get('/employe', (req, res, next) => {
    res.json({data: "Page qui sert l'app React employé!"});
});

router.use('/api', apiRouter);


module.exports = router;
