var router = require('express').Router();
var passport = require('../../auth/passport');

var loggedIn = require('./loggedIn');

var UtilisateurDAO = require('../../dao/UtilisateurDAO');

router.post('/login', (req, res, next) => {    
    passport.authenticate('local', (err, user, info) => {       
        if(err){ res.status(500).json({error : "Une erreur serveur est survenue."}); }
        if(!user){  res.status(401).json({error : info.message}); } 
        else { 
            req.login(user, (err) => {
                if(err) { res.status(500).json({error : "Une erreur serveur est survenue."}); }
                else{ res.json({pseudo: user.pseudo, categorieUtilisateur: user.categorieUtilisateur, categorieEmploye: user.categorieEmploye}); }
            });            
        }
    })(req, res, next);
});

router.get('/getLoggedUser', loggedIn, (req, res, next) => {
    console.log(req.session.passport.user);
    UtilisateurDAO.findById(req.session.passport.user)
    .then((user) => {
        res.json({pseudo: user.pseudo, categorieUtilisateur: user.categorieUtilisateur, categorieEmploye: user.categorieEmploye});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error : "Une erreur serveur est survenue."});
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({message: "Déconnecté."});
});


module.exports = router;