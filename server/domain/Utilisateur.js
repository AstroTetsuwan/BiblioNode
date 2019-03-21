var Personne = require("./Personne");

class Utilisateur extends Personne{
    constructor(nom, prenom, dob, sexe, id, pseudo, pwd, categorieUtilisateur){
        super(nom, prenom, dob, sexe);
        this.id = id;
        this.pseudo = pseudo;
        this.pwd = pwd;
        this.categorieUtilisateur = categorieUtilisateur;
    }

    isPretEnRetard(id){
        return true;
    }
}

module.exports = Utilisateur;