var pool = require('../db/db').getPool();
var EmpruntEnCours = require('../domain/EmpruntEnCours');

var EmpruntEnCoursDAO = {
    insertEmpruntEnCours: async function(emprunt){
        try{
            let results = await pool.query('INSERT INTO emprunt_en_cours (id_exemplaire, id_utilisateur, date_emprunt) VALUES (?,?,?)');
            return results.insertId;
        }catch(err){
            console.log("DB ERROR EmpruntEnCoursDAO.insertEmpruntEnCours: " + err);
            return false;
        }  
    },

    findEmpruntEnCoursByUtilisateur: async function(userId){
        try{
            let results = await pool.query('SELECT * FROM emprunt_en_cours WHERE id_utilisateur = ?', [userId]);
            return results.length > 0 ? results.map(emp => new EmpruntEnCours(emp.date_emprunt, emp.id_exemplaire, emp.id_utilisateur)) : false;
        }catch(err){
            console.log("DB ERROR EmpruntEnCoursDAO.findEmpruntEnCoursByUtilisateur: " + err);
            return false;
        } 
    },

    findEmpruntEnCoursByExemplaire: async function(exId){
        try{
            let results = await pool.query('SELECT * FROM emprunt_en_cours WHERE id_exemplaire = ?', [exId]);
            return results.length > 0 ? results.map(emp => new EmpruntEnCours(emp.date_emprunt, emp.id_exemplaire, emp.id_utilisateur)) : false;
        }catch(err){
            console.log("DB ERROR EmpruntEnCoursDAO.findEmpruntEnCoursByExemplaire: " + err);
            return false;
        } 
    },

    deleteEmpruntEnCours: async function(userId, exId){
        try{
            let results = await pool.query('DELETE FROM emprunt_en_cours WHERE id_exemplaire = ? AND id_utilisateur = ?', [exId, userId]);
            return true;
        }catch(err){
            console.log("DB ERROR EmpruntEnCoursDAO.deleteEmpruntEnCours: " + err);
            return false;
        } 
    }
};

module.exports = EmpruntEnCoursDAO;