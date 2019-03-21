var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

var EditeurDAO = require('../dao/EditeurDAO');

/* GET home page. */
router.get('/', (req, res, next) => {
    EditeurDAO.findAllEditeur()
    .then((result) => {
        res.json({data: "Page avec les deux boutons qui mennent à l'interface adhérent ou employé !", result: result[0].nom_editeur});
    }).catch((err) => {
        console.log("dbErr: " + err);
    });
    
});


router.get('/adherent', (req, res, next) => {
    res.json({data: "Page qui sert l'app React adhérent!"});
});

router.get('/employe', (req, res, next) => {
    res.json({data: "Page qui sert l'app React employé!"});
});

router.use('/api', apiRouter);




module.exports = router;
