class Livre {
    constructor(isbn, titre, theme, editeur, nbPages, anneeParution, auteur, exemplaires){
        this.isbn = isbn;
        this.titre = titre;
        this.theme = theme;
        this.editeur = editeur;
        this.nbPages = nbPages;
        this.anneeParution = anneeParution;
        this.auteur = auteur;

        this.exemplaires = exemplaires || [];
    }
}

module.exports = Livre;