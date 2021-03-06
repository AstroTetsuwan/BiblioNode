var router = require('express').Router();
var passport = require('../../auth/passport');

var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');
var hashPass = require('../../auth/HashPass');
var DBErrorManager = require('../../utils/DBErrorManager');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var EmployeDAO = require('../../dao/EmployeDAO');
var Employe = require('../../domain/Employe');

//AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION
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

router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({message: "Déconnecté."});
});

//Return the current logged user
router.get('/getLoggedUser', loggedIn, (req, res, next) => {
    
    UtilisateurDAO.findById(req.session.passport.user)
    .then((user) => {
        if(!user){res.status(401).json({error : "L'utilisateur n'existe pas."});}
        else{res.json({pseudo: user.pseudo, categorieUtilisateur: user.categorieUtilisateur, categorieEmploye: user.categorieEmploye});}
    })
    .catch(err => DBErrorManager(err, req, res, next));
});

//AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION //AUTHENTICATION

router.post('/add', loggedIn, userLevel('RESPONSABLE'), (req, res , next) => {
    let emp = req.body;
    emp.password = hashPass.getHash(emp.password);
    let employe = new Employe(emp.nom, emp.prenom, new Date(emp.dob), emp.sexe, 
        0, emp.pseudo, emp.password, 'EMPLOYE', 0, emp.categorieEmploye);
    
    UtilisateurDAO.insertEmploye(employe)
    .then(user => EmployeDAO.insertEmploye(user))
    .then((user) => { res.json({success: true, userId: user.id});})
    .catch(err => DBErrorManager(err, req, res, next));                 
});

router.post('/update', loggedIn, userLevel('RESPONSABLE'),(req, res, next) =>{
    // We dont update password here ! isolate the stuff in complete use case
    let user = req.body;
    UtilisateurDAO.updateUtilisateur(user)
    .then(user => EmployeDAO.updateEmploye(user))
    .then((userId) => { res.json({userId: userId}); })
    .catch(err => DBErrorManager(err, req, res, next));
});

router.get('/delete/:id', loggedIn, userLevel('RESPONSABLE'),(req, res, next) => {
    EmployeDAO.deleteEmploye(req.params.id)
    .then(id => UtilisateurDAO.deleteUtilisateur(id))
    .then((success) => { res.json({success: success}); })
    .catch(err => DBErrorManager(err, req, res, next));
});


router.get('/findAll', loggedIn, userLevel('RESPONSABLE'), (req, res, next) => {
    EmployeDAO.findAll()
    .then((results) => { 
        results = results.map((emp) => {emp.password = ""; return emp;});
        res.json(results);
    })
    .catch(err => DBErrorManager(err, req, res, next));
});

module.exports = router;