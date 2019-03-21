class EmpruntEnCours{
    constructor(dateEmprunt, idExemplaire, idUtilisateur){
        this.dateEmprunt = dateEmprunt;
        this.idExemplaire = idExemplaire;
        this.idUtilisateur = idUtilisateur;
    }
}

module.exports = EmpruntEnCours;