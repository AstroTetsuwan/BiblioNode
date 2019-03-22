var router = require('express').Router();

var ExemplaireDAO = require('../../dao/ExemplaireDAO');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');


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
        res.json({data: result});
    })
    .catch((err) => { res.json({data: err}); });
});


module.exports = router;