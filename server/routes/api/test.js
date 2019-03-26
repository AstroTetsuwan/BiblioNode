var router = require('express').Router();

var hashPass = require('./../../auth/HashPass');
var ExemplaireDAO = require('../../dao/ExemplaireDAO');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var EditeurDAO = require('../../dao/EditeurDAO');
var EmployeDAO = require('../../dao/EmployeDAO');
var AdherentGeneralDAO = require('../../dao/AdherentGeneralDAO');
var AdherentDAO = require('../../dao/AdherentDAO');

router.get('/findEditeurById/:id', (req, res, next) => {
    let id = req.params.id;
    EditeurDAO.findEditeurById(id)
    .then((result) => {
        res.json({data: result});
    })
    .catch((err) => { res.json({data: err}); });
});

router.get('/findExemplaireById/:id', (req, res, next) => {
    let id = req.params.id;
    ExemplaireDAO.findById(id)
    .then((result) => {
        res.json({data: result});
    })
    .catch((err) => { res.json({data: err}); });
});

router.get('/findUserByPseudo/:pseudo', (req, res, next) => {
    let pseudo = req.params.pseudo;
    UtilisateurDAO.findByPseudo(pseudo)
    .then((result) => {
        //check catergorie_utilisateur -> new Employe/Adherent
        res.json({data: result});
    })
    .catch((err) => { res.json({data: err}); });
});
router.get('/findUserById/:id', (req, res, next) => {
    let id = req.params.id;
    UtilisateurDAO.findById(id)
    .then((result) => {
        if(!result){res.status(401).json({error : "L'utilisateur n'existe pas."});}
        res.json({data: result});
    })
    .catch((err) => { res.json({data: err}); });
});

router.get('/insertEmploye', (req, res, next) => {
    EmployeDAO.insertEmploye(2, 'BIBLIOTHECAIRE')
    .then((success) => { console.log("SUCCESS");})
    .catch((err) => {console.log(err);});
});
router.get('/findEmp', (req, res, next) => {
    EmployeDAO.findEmployeById(2)
    .then((results) => { console.log(results);})
    .catch((err) => {console.log(err);});
});

router.get('/findAll', (req, res, next) => {
    EmployeDAO.findAll()
    .then((results) => { res.json(results);})
    .catch((err) => {console.log(err);});
});

router.get('/getAdhgeneral', (req, res, next) => {
    AdherentGeneralDAO.findAdherentGeneral()
    .then((results) => {res.json({results: results})})
    .catch((err) => {console.log(err)});
});
router.get('/updateADG', (req, res, next) => {
    AdherentGeneralDAO.updateAdherentGeneral(4,16)
    .then((results) => { res.json({success: true}); })
    .catch((err) => { console.log(err); res.json({success: true}); });
});

router.get('/insertAdherent', (req, res, next) => {
    var user = {nom: 'Joe', prenom: 'Joe', password: hashPass.getHash('lol'), pseudo: 'joejoe', dob: new Date(), sexe: 'H', telephone: '0160294848', dateCotisation: new Date()};
    UtilisateurDAO.insertAdherent(user)
    .then(user => AdherentDAO.insertAdherent(user))
    .then(user => res.json({user: user}))
    .catch(err => console.log(err));
});

router.get('/updateCotisation', (req, res, next) => {
    AdherentDAO.updateCotisation(15, new Date())
    .then(success => res.json({success: success}))
    .catch(err => { console.log(err); res.json({success: false});});
});


router.get('/hashpass', (req, res, next) => {
    res.json({hash: hashPass.getHash('root')});
});

router.get('/searchAdherent', (req, res, next) => {
    UtilisateurDAO.searchAdherent('ome', 10, 0)
    .then((results) => {res.json({r: results})})
    .catch(err => { console.log(err); res.json({success: false});});
});

router.get('/searchCountAdherent', (req, res, next) => {
    UtilisateurDAO.searchCountAdherent('ome')
    .then((total) => {res.json({r: total})})
    .catch(err => { console.log(err); res.json({success: false});});
});


router.get('/editeurFindByNome', (req, res, next) => {
    EditeurDAO.findEditeurByNom("Gallimard")
    .then(editeur => console.info("Editeur found : ", editeur))
    .catch(err => console.log("Fail to find editeur: " + err));
});

router.get('/insertEditeur', (req, res, next) => {
    EditeurDAO.insertEditeur({nom: "gallimard", ville: "Marseille"})
    .then(id => console.log("Inserted - index : " + id))
    .catch(err => console.log("Fail insert editeur: " + err));
});

router.get('/updateEditeur', (req, res, next) => {
    EditeurDAO.updateEditeur({id: 1, nom: "Gallimard", ville: "Paris"})
    .then(success => console.log("update success : " + success))
    .catch(err => console.log("Fail update editeur: " + err));
});

module.exports = router;