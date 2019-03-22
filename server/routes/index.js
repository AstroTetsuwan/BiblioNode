var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

var EditeurDAO = require('../dao/EditeurDAO');

/* GET home page. */
router.get('/', (req, res, next) => {
    
    /*NOPROMISES  
    
    let results = []; 
    EditeurDAO.findAllEditeur((err, result) => {
        if(err) console.log(err);
        results.push(result);
        EditeurDAO.findEditeurById(1, (err, result) => {
            if(err) console.log(err);
            results.push(result);
            res.json({data: "Page avec les deux boutons qui mennent à l'interface adhérent ou employé !", result: results});
        });
    });
    */
    /*WITH PROMISES
    EditeurDAO.findEditeurById(1)
    .then((result) => { 
        res.json({data: result});
    })
    .catch((error) => { console.log(error); }); 
    */
});

router.get('/adherent', (req, res, next) => {
    res.json({data: "Page qui sert l'app React adhérent!"});
});

router.get('/employe', (req, res, next) => {
    res.json({data: "Page qui sert l'app React employé!"});
});

router.use('/api', apiRouter);


module.exports = router;
