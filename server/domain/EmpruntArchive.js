class EmpruntArchive{
    constructor(id, dateEmprunt, dateRestitution, idExemplaire, idUtilisateur){
        this.id = id;
        this.dateEmprunt = dateEmprunt;
        this.dateRestitution = dateRestitution;
        this.idExemplaire = idExemplaire;
        this.idUtilisateur = idUtilisateur;
    }
}

module.exports = EmpruntArchive;