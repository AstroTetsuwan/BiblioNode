var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var HashPass = require('./HashPass');
var UtilisateurDAO = require('../dao/UtilisateurDAO');

passport.use(new LocalStrategy(
    function(username, password, next){
        console.log("PASSPORT STRATEGY");
        UtilisateurDAO.findByPseudo(username)
        .then((user) => {
            console.log('USER')
            console.log(user);
            if(user === null){
                return next(null, false, {message : "Ce nom d'utilisateur n'existe pas."}) ;
            }
            //encrypt password
            password = HashPass.getHash(password);
            if(user.password !== password){
                return next(null, false, {message : 'Mot de passe incorrect'}) ;
            }

            if(user.categorieUtilisateur !== 'EMPLOYE'){
                return next(null, false, {message : 'Utilisateur non autorisé.'}) ;
            }

            return next(null, user);
        })
        .catch((err) => {
            console.log("Passport error:");
            console.log(err);
            return next(err);
        });
    }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser(function(id, cb) {
    UtilisateurDAO.findById(id)
    .then((user) => {
        cb(null, user);
    })
    .catch((err) => {
        console.log("DB ERROR WHILE DESERIALIZE USER IN PASSPORT LOCAL STRATEGY: ");
        console.log(err);
    });
});

module.exports = passport;