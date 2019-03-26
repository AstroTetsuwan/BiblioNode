var router = require('express').Router();


var AuteurDAO = require('../../dao/AuteurDAO');


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
    .then(results => res.json({results: results}))
    .catch(err => { console.log(err); res.json({results: []}); });
});

module.exports = router;