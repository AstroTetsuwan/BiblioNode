var router = require('express').Router();
var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');
var DBErrorManager = require('../../utils/DBErrorManager');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');


router.get('/find/:id', loggedIn,(req, res, next) => {
    UtilisateurDAO.findById(req.params.id)
    .then((user) => {
        user.password = "";
        res.json({user: user});
    })
    .catch(err => DBErrorManager(err, req, res, next));
});



module.exports = router;