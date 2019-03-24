var Utilisateur = require('./Utilisateur');

class Adherent extends Utilisateur{
    constructor(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur, telephone, dateCotisation){
        super(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur);
        this.telephone = telephone;
        this.dateCotisation = dateCotisation;
    }
}

module.exports = Adherent;