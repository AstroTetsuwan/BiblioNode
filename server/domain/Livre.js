class Livre {
    constructor(isbn, titre, theme, editeur, nbPages, anneeParution, auteur){
        this.isbn = isbn;
        this.titre = titre;
        this.theme = theme;
        this.editeur = editeur;
        this.nbPages = nbPages;
        this.anneeParution = anneeParution;
        this.auteur = auteur;
    }
}

module.exports = Livre;