var Personne = require("./Personne");

class Utilisateur extends Personne{
    constructor(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur){
        super(nom, prenom, dob, sexe);
        this.id = id;
        this.pseudo = pseudo;
        this.password = pwd;
        this.categorieUtilisateur = categorieUtilisateur;
    }
}

module.exports = Utilisateur;