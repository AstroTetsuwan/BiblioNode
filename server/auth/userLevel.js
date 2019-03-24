var EmployeDAO = require('../dao/EmployeDAO');
var userLevel = function isAuthorized(level){
    return function(req, res, next){
        EmployeDAO.findEmployeById(req.session.passport.user)//id of user in session 
        .then((employe) => { 
            if(level === 'RESPONSABLE' && employe.categorie_employe !== 'RESPONSABLE'){
                res.status(401).json({unauthorized: "Unauthorized"});
            }
            if(level === 'GESTIONNAIRE' && (employe.categorie_employe !== 'RESPONSABLE' || employe.categorie_employe !== 'GESTIONNAIRE')){
                res.status(401).json({unauthorized: "Unauthorized"});
            }
            return next();
        })
        .catch((err) => {res.status(401).json({unauthorized: "Unauthorized"});});
    }   
}

module.exports = userLevel;