var router = require('express').Router();

var ExemplaireDAO = require('../../dao/ExemplaireDAO');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var EditeurDAO = require('../../dao/EditeurDAO');
var EmployeDAO = require('../../dao/EmployeDAO');

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

module.exports = router;