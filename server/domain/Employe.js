var Utilisateur = require('./Utilisateur');

class Employe extends Utilisateur{
    constructor(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur, matricule, categorieEmploye){
        super(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur);
        this.matricule = matricule;
        this.categorieEmploye = categorieEmploye;
    }
}

module.exports = Employe;