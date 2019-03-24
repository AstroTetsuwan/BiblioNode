var pool = require('../db/db').getPool();

var Employe = require('../domain/Employe');
var Adherent = require('../domain/Adherent');

var UtilisateurDAO = {
    
    findByPseudo: async function(pseudo) {
        let sql = 'SELECT *, u.id_utilisateur FROM utilisateur u '  
        + 'LEFT OUTER JOIN employe e ON u.id_utilisateur = e.id_utilisateur '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = e.id_utilisateur '
        + 'WHERE u.pseudonyme = ? AND e.id_utilisateur IS NOT NULL OR a.id_utilisateur IS NOT NULL';        
        try{
            let results = await pool.query(sql, [pseudo]);
                 
            if(results.length === 1){
                return results[0].categorie_utilisateur === 'EMPLOYE' ? 
                new Employe(results[0].nom, results[0].prenom, results[0].date_naissance, results[0].sexe, 
                    results[0].id_utilisateur, results[0].pseudonyme, results[0].pwd, results[0].categorie_utilisateur, results[0].matricule, results[0].categorie_employe) :
                new Adherent(results[0].nom, results[0].prenom, results[0].date_naissance, results[0].sexe, 
                    results[0].id_utilisateur, results[0].pseudonyme, results[0].pwd, results[0].categorie_utilisateur, results[0].telephone);           
            }
            else{ return null; }
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.findByPseudo: " + err);
            return null;
        }   
    },

    findById: async function(id) {
        let sql = 'SELECT *, u.id_utilisateur FROM utilisateur u '  
        + 'LEFT OUTER JOIN employe e ON u.id_utilisateur = e.id_utilisateur '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = e.id_utilisateur '
        + 'WHERE u.id_utilisateur = ? AND e.id_utilisateur IS NOT NULL OR a.id_utilisateur IS NOT NULL';               
        try{
            let results = await pool.query(sql, [id]);
              
            if(results.length === 1){
                return results[0].categorie_utilisateur === 'EMPLOYE' ? 
                new Employe(results[0].nom, results[0].prenom, results[0].date_naissance, results[0].sexe, 
                    results[0].id_utilisateur, results[0].pseudonyme, results[0].pwd, results[0].categorie_utilisateur, results[0].matricule, results[0].categorie_employe) :
                new Adherent(results[0].nom, results[0].prenom, results[0].date_naissance, results[0].sexe, 
                    results[0].id_utilisateur, results[0].pseudonyme, results[0].pwd, results[0].categorie_utilisateur, results[0].telephone);           
            }
            else{ return null; }
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.findById: " + err);
            return null;
        }   
    },

    insertUtilisateur: async function(user){
        let sql = 'INSERT INTO utilisateur (nom, prenom, pwd, pseudonyme, date_naissance, sexe, categorie_utilisateur) VALUES (?,?,?,?,?,?,?)';
        let utilisateur = [user.nom, user.prenom, user.password, user.pseudo, user.dob, user.sexe, 'EMPLOYE'];
        try{
            let results = await pool.query(sql, utilisateur);
            return {id: results.insertId, categorieEmploye: user.categorieEmploye};
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.insertUtilisateur: " + err);
            return false;
        }
    }

}

module.exports = UtilisateurDAO;