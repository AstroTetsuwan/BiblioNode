var router = require('express').Router();
var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');
var DBErrorManager = require('../../utils/DBErrorManager');
var UtilisateurDAO = require('../../dao/UtilisateurDAO');
var ExemplaireDAO = require('../../dao/ExemplaireDAO');
var EmpruntEnCoursDAO = require('../../dao/EmpruntEnCoursDAO');
var AdherentGeneralDAO = require('../../dao/AdherentGeneralDAO');

router.get('/find/:id', loggedIn,(req, res, next) => {
    UtilisateurDAO.findById(req.params.id)
    .then((user) => {
        user.password = "";
        res.json({user: user});
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
            if(exemplaire.statusExemplaire !== 'DISPONIBLE'){ res.status(400).json({error: "Le statut de l'exemplaire n'est pas disponible, effectuer le retour avant."}); }
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
                        console.log("RULES");
                        console.log(rules);
                        EmpruntEnCoursDAO.findEmpruntEnCoursByUtilisateur(user.id)
                        .then(userEmprunts => {
                            let isLate = false; 
                            userEmprunts.forEach(e => {
                                let limit = new Date(e.dateEmprunt);
                                limit.setDate(limit.getDate() + rules.duree_max_prets);
                                if(limit < new Date()){isLate = true;}
                            });
                            if(isLate){
                                res.status(400).json({error: "L'adhérent a un ou des emprunts en retard."})
                            } else if(userEmprunts.length > rules.nb_max_prets - 1){
                                res.status(400).json({error: "L'adhérent a déjà atteint le nombre maximum de prêts autorisés."})
                            } else{
                                EmpruntEnCoursDAO.insertEmpruntEnCours({idExemplaire: idExemplaire, idUtilisateur: user.id, dateEmprunt: new Date()})
                                .then(idEmprunt => {
                                    ExemplaireDAO.updateStatus(idExemplaire, 'PRETE')
                                    .then( success => res.json({success: true}))
                                    .catch(err => res.status(400).json({error: "Une erreur est survenue en mettant à jour le status de l'exemplaire."}));
                                })
                                .catch(err => res.status(400).json({error: "Une erreur est survenue en insérant l'emprunt."}));
                            }
                        })
                        .catch(err => {
                            console.log(err);
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

module.exports = router;