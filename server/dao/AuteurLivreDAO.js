var pool = require('../db/db').getPool();

AuteurLivreDAO = {
    findByAuteurId: async function(auteurId){
        try{
            let results = await pool.query('SELECT * FROM auteur_livre WHERE id_auteur = ?', [auteurId]);
            return results.length > 0 ? results : false;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.findByAuteurId : " + err);
            throw err;
        }
    },

    findByIsbn: async function(isbn){
        try{
            let results = await pool.query('SELECT * FROM auteur_livre WHERE isbn = ?', [isbn]);
            return results.length > 0 ? results : false;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.findByIsbn : " + err);
            throw err;
        }
    },    

    insertAuteurLivre: async function(auteurId, isbn, ordreAuteur){
        try{
            let results = await pool.query('INSERT INTO auteur_livre (isbn, id_auteur, ordre_auteur) VALUES (?,?,?)', [isbn, auteurId, ordreAuteur]);
            return true;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.insertAuteurLivre : " + err);
            throw err;
        }
    },

    insertMultipleAuteursLivre: async function(auteursIds, isbn){
        try{
            const promises = auteursIds.map((id, i) => { 
                return this.insertAuteurLivre(id, isbn, i + 1)
                .then(success => {return Promise.resolve(success); })
                .catch(err => {console.log(err); return Promise.reject(err); }) 
            });
            await Promise.all(promises);
            return true;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.insertMultipleAuteursLivre : " + err);
            throw err;
        }
    },

    deleteAuteurLivreByIdAuteur: async function(idAuteur){
        try{
            let results = await pool.query('DELETE FROM auteur_livre WHERE id_auteur = ?', [idAuteur]);
            return true;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.deleteAuteurLivreByIdAuteur : " + err);
            throw err;
        }
    },

    deleteAuteurLivreByIsbn: async function(isbn){
        try{
            let results = await pool.query('DELETE FROM auteur_livre WHERE isbn = ?', [isbn]);
            return true;
        } catch(err){
            console.log("DB ERROR : AuteurLivreDAO.deleteAuteurLivreByIsbn : " + err);
            throw err;
        }
    }
};

module.exports = AuteurLivreDAO;