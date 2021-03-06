var router = require('express').Router();
var AuteurDAO = require('../../dao/AuteurDAO');
var ThemeDAO = require('../../dao/ThemeDAO');
var EditeurDAO = require('../../dao/EditeurDAO');
var LivreDAO = require('../../dao/LivreDAO');
var AuteurLivreDAO = require('../../dao/AuteurLivreDAO');
var ExemplaireDAO = require('../../dao/ExemplaireDAO');

var Theme = require('../../domain/Theme');

var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/add', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    let livre = req.body;    
    LivreDAO.findLivreByIsbn(livre.isbn)
    .then(doesLivreExist => {
        if(!doesLivreExist){
            let resultObject = {};
            AuteurDAO.insertMultipleAuteurs(livre.auteurs)
            .then(auteursIds => { 
                resultObject.auteursIds = auteursIds; 
                return LivreDAO.insertLivre(livre);
            })
            .then(livreId => {
                AuteurLivreDAO.insertMultipleAuteursLivre(resultObject.auteursIds, livreId)
                .then(success => res.json({livreId: livreId}))
                .catch(err => { res.json({error: "Une erreur est survenue."}) });                
            })
            .catch(err => { res.json({error: "Une erreur est survenue."}); });
        }
        else{ res.json({livreId:doesLivreExist.isbn}); }
    })
    .catch(err =>  res.json({error: "Une erreur est survenue."}));   
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/update/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    res.json({data:'update book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    let isbn = req.params.bookId;
    AuteurLivreDAO.deleteAuteurLivreByIsbn(isbn)
    .then(success => {return ExemplaireDAO.deleteAllExemplairesOfBook(isbn)})
    .then(success => {return LivreDAO.deleteLivre(isbn)})
    .then(success => res.json({success: true}))
    .catch(err => res.json({error: "Une erreur est survenue."}));
});

router.get('/find/:bookId', (req, res, next) => {
    LivreDAO.findLivreByIsbn(req.params.bookId)
    .then(livre => res.json({livre: livre}))
    .catch(err => res.json({error: err}));
});

router.get('/search/:keywords/:page', (req, res, next) => {
    res.json({data:'search book'});
});

//PROTECTED
router.get('/loan-history/:bookId', loggedIn, (req, res, next) => {
    res.json({data:'loan history book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/add-exemplaire/:bookId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    ExemplaireDAO.insertExemplaire(req.params.bookId)
    .then(id => res.json({success: true}))
    .catch(err => res.json({success: false}));
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete-exemplaire/:exemplaireId', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {
    ExemplaireDAO.deleteExemplaire(req.params.exemplaireId)
    .then(id => res.json({success: true}))
    .catch(err => res.json({success: false}));
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/autocomplete/auteur/:name', loggedIn, userLevel('GESTIONNAIRE'), (req, res, next) => {    
    AuteurDAO.searchByNom(req.params.name)
    .then(results => res.json({results: results.map((auteur) => { return {value: (auteur.nom + " " + auteur.prenom), id: auteur.id} }) }))
    .catch(err => { console.log(err); res.json({results: []}); });
});


router.post('/theme/add', (req, res, next) => {
    console.log(req.body);
    ThemeDAO.insertTheme(new Theme(req.body.code, req.body.libelle, (req.body.parent === "") ? false : req.body.parent.split(" - ")[0]))
    .then(success => res.json({success: true}))
    .catch(err => {
        err.code === 'ER_DUP_ENTRY' ? res.json({error: "Ce code thème est déjà enregistré."}) : res.json({error: "Une erreur est survenue"})
    });   
});

router.get('/theme/findAll', (req, res, next) => {
    ThemeDAO.findAll()
    .then(results => res.json({results: results}))
    .catch(err => res.json({error: "Une erreur est survenue."}));
});

router.post('/editeur/add', (req, res, next) => {
    EditeurDAO.findEditeurByNom(req.body.nom)
    .then((editeur) => {
        if(!editeur){
            EditeurDAO.insertEditeur({nom: req.body.nom, ville: req.body.ville})
            .then(id => res.json({success: true}))
            .catch(err => { console.log(err); res.json({error: "Une erreur est survenue."}); });
        } else{
            res.json({error: "Cet éditeur est déjà enregistré."});
        }
    })
});

router.get('/editeur/findAll', (req, res, next) => {
    EditeurDAO.findAllEditeur()
    .then(results => res.json({results: results}))
    .catch(err => res.json({error: "Une erreur est survenue."}));
});

module.exports = router;