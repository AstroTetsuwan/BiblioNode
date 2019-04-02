var router = require('express').Router();
var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');
var DBErrorManager = require('../../utils/DBErrorManager');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var ExemplaireDAO = require('../../dao/ExemplaireDAO');
var EmpruntEnCoursDAO = require('../../dao/EmpruntEnCoursDAO');
var AdherentGeneralDAO = require('../../dao/AdherentGeneralDAO');
var EmpruntArchiveDAO = require('../../dao/EmpruntArchiveDAO');

router.get('/find/:id', loggedIn,(req, res, next) => {
    UtilisateurDAO.findById(req.params.id)
    .then((user) => {
        user.password = "";
        EmpruntEnCoursDAO.findEmpruntEnCoursByUtilisateur(user.id)
        .then(emprunts => {
           if(emprunts.length > 0){ user.emprunts = emprunts;}
            res.json({user: user});
        })
        .catch(err => DBErrorManager(err, req, res, next));
    })
    .catch(err => DBErrorManager(err, req, res, next));
});

router.post('/emprunt/add', loggedIn, (req, res, next) => {
    let user = req.body.user;
    let idExemplaire = req.body.idExemplaire;
   
    ExemplaireDAO.findById(idExemplaire)
    .then(exemplaire => {
        if(!exemplaire){ res.status(400).json({error: "L'identifiant de l'exemplaire n'existe pas en base de données."}) }
        else{
            if(exemplaire.statusExemplaire !== 'DISPONIBLE'){ res.status(400).json({error: "Le statut de l'exemplaire n'est pas disponible, effectuez le retour avant."}); }
            else{
                if(user.categorieUtilisateur === 'EMPLOYE'){
                    EmpruntEnCoursDAO.insertEmpruntEnCours({idExemplaire: idExemplaire, idUtilisateur: user.id, dateEmprunt: new Date()})
                    .then(idEmprunt => {
                        ExemplaireDAO.updateStatus(idExemplaire, 'PRETE')
                        .then( success => res.json({success: true}))
                        .catch(err => res.status(400).json({error: "Une erreur est survenue."}));
                    })
                    .catch(err => res.status(400).json({error: "Une erreur est survenue."}));
                } else {
                    AdherentGeneralDAO.findAdherentGeneral()
                    .then(rules => {
                        EmpruntEnCoursDAO.findEmpruntEnCoursByUtilisateur(user.id)
                        .then(userEmprunts => {
                            let isLate = false; 
                            userEmprunts.forEach(e => {
                                let limit = new Date(e.dateEmprunt);
                                limit.setDate(limit.getDate() + rules.duree_max_prets);
                                if(limit < new Date()){isLate = true;}
                            });
                            if(isLate){ res.status(400).json({error: "L'adhérent a un ou des emprunts en retard."}) }
                            else if(userEmprunts.length > rules.nb_max_prets - 1){
                                res.status(400).json({error: "L'adhérent a déjà atteint le nombre maximum de prêts autorisés."})
                            } else {
                                EmpruntEnCoursDAO.insertEmpruntEnCours({idExemplaire: idExemplaire, idUtilisateur: user.id, dateEmprunt: new Date()})
                                .then(idEmprunt => {
                                    ExemplaireDAO.updateStatus(idExemplaire, 'PRETE')
                                    .then(success => res.json({success: true}))
                                    .catch(err => res.status(400).json({error: "Une erreur est survenue en mettant à jour le status de l'exemplaire."}));
                                })
                                .catch(err => res.status(400).json({error: "Une erreur est survenue en insérant l'emprunt."}));
                            }
                        })
                        .catch(err => {
                            res.status(400).json({error: "Une erreur est survenue en récupérant les emprunts utilisateur."})
                        });
                    })                   
                    .catch(err => res.status(400).json({error: "Une erreur est survenue en récupérant les règles."}));
                }
            }
        }
    })
    .catch(err => DBErrorManager(err, req, res, next));    
});

router.post('/emprunt/retour', loggedIn, (req, res, next) => {
    let idExemplaire = req.body.idExemplaire;
    ExemplaireDAO.updateStatus(idExemplaire, 'DISPONIBLE')
    .then(success => {
        EmpruntEnCoursDAO.findEmpruntEnCoursByExemplaire(idExemplaire)
        .then(empruntEnCours => {
            console.log('----------------------')
            console.log(empruntEnCours);
            console.log('----------------------')
            EmpruntEnCoursDAO.deleteEmpruntEnCours(idExemplaire)
            .then(success => {
                EmpruntArchiveDAO.insert({
                    dateEmprunt: empruntEnCours.dateEmprunt, dateRestitution: new Date(), idExemplaire: idExemplaire, idUtilisateur: empruntEnCours.idUtilisateur
                })
                .then(success => res.json({success: success}))
                .catch(err => {console.log("ERREUR ARCHIVE INSERT"); console.log(err);DBErrorManager(err, req, res, next)});
            })
            .catch(err => {console.log("ERREUR DELETE EMPRUNT");DBErrorManager(err, req, res, next)});
        })       
        .catch(err => {console.log("ERREUR FIND EMPRUNT");DBErrorManager(err, req, res, next)});
    })
    .catch(err => {console.log("ERREUR UPDATE EXEMPLAIRE"); console.log(err);DBErrorManager(err, req, res, next)});
});

module.exports = router;