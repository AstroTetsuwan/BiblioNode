var pool = require('../db/db').getPool();
var Livre = require('../domain/Livre');
var Auteur = require('../domain/Auteur');
var Theme = require('../domain/Theme');
var Editeur = require('../domain/Editeur');
var Exemplaire = require('../domain/Exemplaire');

var LivreDAO = {

    findLivreByIsbn: async function (isbn){
        let sql = "SELECT l.isbn, l.titre, l.annee_parution, l.nb_pages, l.cover_image, e.id_editeur, e.nom_editeur, e.ville, " +
        "t.code_theme, t.libelle, t.theme_parent " +
        "FROM livre l INNER JOIN editeur e on e.id_editeur = l.id_editeur " +
        "INNER JOIN theme t on t.code_theme = l.code_theme " +
        "WHERE l.isbn = ?";

        try{
            let results = await pool.query(sql, [isbn]);
            if(results.length !== 1){ return false; }
            
            try{
                let sql2 = "SELECT * FROM auteur INNER JOIN auteur_livre al ON auteur.id_auteur = al.id_auteur WHERE al.isbn = ? ORDER BY al.ordre_auteur";
                let auteurResults = await pool.query(sql2, [isbn]);
                let bookAuteurs = auteurResults.map(auteur => { 
                    let a = new Auteur(auteur.id_auteur, auteur.nom, auteur.prenom); 
                    a.ordreAuteur = auteur.ordre_auteur;
                    return a;
                });
                try{
                    let exemplairesResults = await pool.query("SELECT * FROM exemplaire WHERE isbn = ?", [isbn]);
                    let bookExemplaires = exemplairesResults.map(ex => new Exemplaire(ex.id_exemplaire, ex.date_achat, ex.isbn, ex.status_exemplaire));
                            
                    let livre = new Livre(isbn, results[0].titre, 
                        new Theme(results[0].code_theme, results[0].libelle, results[0].theme_parent), 
                        new Editeur(results[0].id_editeur, results[0].nom_editeur, results[0].ville),
                        results[0].nb_pages, results[0].annee_parution, bookAuteurs, bookExemplaires ); 
                    return livre;
                }catch(err){ console.log("DB ERROR : LivreDAO.findLivreByIsbn 1: " + err); throw err; }
            } catch(err){ console.log("DB ERROR : LivreDAO.findLivreByIsbn 2: " + err); throw err; }          
        } catch(err){ console.log("DB ERROR : LivreDAO.findLivreByIsbn 3: " + err); throw err; }
    },

    insertLivre: async function(livre){
        let sql = livre.coverImage ? "INSERT INTO livre (isbn, titre, id_editeur, code_theme, annee_parution, nb_pages, cover_image) VALUES(?,?,?,?,?,?,?)" : 
        "INSERT INTO livre (isbn, titre, id_editeur, code_theme, annee_parution, nb_pages) VALUES(?,?,?,?,?,?)";
        let params = livre.coverImage ? [livre.isbn, livre.titre, livre.idEditeur, livre.codeTheme, livre.anneeParution, livre.nbPages, livre.coverImage] :
            [livre.isbn, livre.titre, livre.idEditeur, livre.codeTheme, livre.anneeParution, livre.nbPages];
        try{
            let results = await pool.query(sql, params);
            return livre.isbn;
        } catch(err){
            console.log("DB ERROR : LivreDAO.insertLivre : " + err);
            throw err;
        }
    },

    updateLivre: async function(livre){
        
    },

    deleteLivre: async function(isbn){
        try{
            await pool.query('DELETE FROM livre WHERE isbn = ?', [isbn]);
            return true;
        }catch(err){
            console.log("DB ERROR : LivreDAO.deleteLivre : " + err);
            throw err;
        }
    }
};

module.exports = LivreDAO;
