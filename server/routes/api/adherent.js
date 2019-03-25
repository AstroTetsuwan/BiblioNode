var router = require('express').Router();
var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');
var hashPass = require('../../auth/HashPass');

var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var AdherentDAO = require('../../dao/AdherentDAO');

router.post('/add', loggedIn, (req, res, next) => {
    req.body.password = hashPass.getHash(req.body.password);
    UtilisateurDAO.insertAdherent(req.body)
    .then(user => AdherentDAO.insertAdherent(user))
    .then(userId => res.json({userId: userId}))
    .catch((err) => {
        if(err.code === "ER_DUP_ENTRY"){ res.status(400).json({error: "Ce pseudo existe déjà."}); } 
        else if(err.code === 'ER_DATA_TOO_LONG'){ res.status(400).json({error: "Pseudo trop long. Maximum 20 caractères."}); } 
        else { res.status(500).json({error: "Une erreur est survenue."}); } 
    });
});

router.post('/update', loggedIn, (req, res, next) => {
    
});

router.get('/delete/:id', loggedIn, userLevel('RESPONSABLE'), (req, res, next) => {
    
});

router.get('/find/:id', loggedIn, (req, res, next) => {
    UtilisateurDAO.findById(req.params.id)
    .then((user) => {
        user.password = "";
        res.json({user: user});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error : "Une erreur serveur est survenue."});
    });
});

router.get('/search/:keywords/:page', loggedIn, (req, res, next) => {
    let offset = (req.params.page - 1) * 10; // for page 2 -> (2-1) * 10 
    let returnedObject = {}; 
    UtilisateurDAO.searchCountAdherent(req.params.keywords)
    .then((results) => {
        returnedObject.count = results;
        return UtilisateurDAO.searchAdherent(req.params.keywords, 10, offset)
    })    
    .then((results) => {
        results.forEach(user => user.password = "");
        returnedObject.users = results;
        res.json(returnedObject);
    })
    .catch(err => { console.log(err); res.json({success: false});});
});

router.get('/update-cotisation/:id', loggedIn, (req, res, next) => {
    AdherentDAO.updateCotisation(req.params.id, new Date())
    .then(success => res.json({success: success}))
    .catch(err => res.json({error: err}));
});



module.exports = router;