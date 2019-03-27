var router = require('express').Router();


var AuteurDAO = require('../../dao/AuteurDAO');
var ThemeDAO = require('../../dao/ThemeDAO');
var Theme = require('../../domain/Theme');

var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/add', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'add book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/update/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'update book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'delete book'});
});

router.get('/find/:bookId', (req, res, next) => {
    res.json({data:'get book'});
});

router.get('/search/:keywords/:page', (req, res, next) => {
    res.json({data:'search book'});
});

//PROTECTED
router.get('/loan-history/:bookId', loggedIn, (req, res, next) => {
    res.json({data:'loan history book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/add-exemplaire/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'add-exemplaire book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/update-exemplaire/:exemplaireId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'add-exemplaire book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete-exemplaire/:exemplaireId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'delete exemplaire book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/autocomplete/auteur/:name', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {    
    AuteurDAO.searchByNom(req.params.name)
    .then(results => { 
        res.json({
            results: results.map((auteur) => { return {value: (auteur.nom + " " + auteur.prenom), id: auteur.id} })
        })
    })
    .catch(err => { console.log(err); res.json({results: []}); });
});


router.post('/theme/add', (req, res, next) => {
    console.log(req.body);
    ThemeDAO.insertTheme(new Theme(req.body.code, req.body.libelle, (req.body.parent === "") ? false : req.body.parent.split(" - ")[0]))
    .then(success => res.json({success: true}))
    .catch(err => {
        err.code === 'ER_DUP_ENTRY' ? res.json({error: "Ce code thème est déjà utilisé."}) : res.json({error: "Une erreur est survenue"})
    });   
});

router.get('/theme/findAll', (req, res, next) => {
    ThemeDAO.findAll()
    .then(results => res.json({results: results}))
    .catch(err => res.json({error: "Une erreur est survenue."}));
});

module.exports = router;