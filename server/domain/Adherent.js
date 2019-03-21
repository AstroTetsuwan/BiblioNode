var Utilisateur = require('./Utilisateur');

class Adherent extends Utilisateur{
    constructor(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur, telephone){
        super(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur);
        this.telephone = telephone;
    }
}

module.exports = Adherent;