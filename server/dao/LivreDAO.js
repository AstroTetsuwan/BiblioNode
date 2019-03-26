var pool = require('../db/db').getPool();
var Livre = require('../domain/Livre');

var LivreDAO = {
    findLivreByIsbn: async function (isbn){
        let sql = "SELECT l.isbn, l.titre, l.annee_parution, l.nb_pages, l.cover_image, e.id_editeur, e.nom_editeur, e.ville, " +
        "a.id_auteur, a.nom, a.prenom, al.ordre_auteur, t.code_theme, t.libelle, t.theme_parent" +
        "FROM livre l INNER JOIN editeur e on e.id_editeur = l.id_editeur " +
        "INNER JOIN auteur_livre al on al.isbn = l.isbn " +
        "INNER JOIN auteur a on a.id_auteur = al.id_auteur " +
        "INNER JOIN theme t on t.code_theme = l.code_theme " +
        "WHERE l.isbn = ?";

        try{
            let results = await pool.query(sql, [isbn]);
            return results.length === 1 ? results[0] : false;
        } catch(err){
            console.log("DB ERROR : LivreDAO.findLivreByIsbn : " + err);
            throw err;
        }
    }
};

module.exports = LivreDAO;
