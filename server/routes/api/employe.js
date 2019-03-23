var router = require('express').Router();

var passport = require('../../auth/passport');

router.post('/auth', (req, res, next) => {    
    passport.authenticate('local', (err, user, info) => {
        if(err){ 
            res.status(500).json({error : "Une erreur serveur est survenue."}); 
        }
        if(!user){
            res.status(401).json({error : info.message}); 
        } else {
            let userData = {
                pseudo: user.pseudo,
                categorieUtilisateur: user.categorieUtilisateur,
                categorieEmploye: user.categorieEmploye
            }
            res.json({user: userData});
        }
    })(req, res, next);
});

module.exports = router;