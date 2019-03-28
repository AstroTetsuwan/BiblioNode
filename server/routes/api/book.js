var router = require('express').Router();
var AuteurDAO = require('../../dao/AuteurDAO');
var ThemeDAO = require('../../dao/ThemeDAO');
var EditeurDAO = require('../../dao/EditeurDAO');
var LivreDAO = require('../../dao/LivreDAO');
var AuteurLivreDAO = require('../../dao/AuteurLivreDAO');

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
                console.log("THAT'S WHAT YOU'LL WANT TO CHECK, LIVRE ISBN: " + livreId);
                AuteurLivreDAO.insertMultipleAuteursLivre(resultObject.auteursIds, livreId)
                .then(success => res.json({success: "SO FUCKIN TRUE MY MATE", livreId: livreId}))
                .catch(error => {
                    console.log("DAMN: " + error);
                    res.json({error: "Une d'erreur est survenue."})       
                });
                
            })
            .catch(err => {
                console.log("SHITSHITSHIT: " + err);
                res.json({error: "Une d'erreur est survenue."});
            });
        }
        else{
            res.json({livreId:doesLivreExist.isbn});
        }
    })
    .catch(err => {
        console.log("DAMN YOU ERROR!!! : " + err);
        res.json({error: "Une d'erreur est survenue."});
    });
    
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