var pool = require('../db/db').getPool();

var Employe = require('../domain/Employe');
var Adherent = require('../domain/Adherent');

var UtilisateurDAO = {
    
    findByPseudo: async function(pseudo) {
        let sql = 'SELECT *, u.id_utilisateur FROM utilisateur u '  
        + 'LEFT OUTER JOIN employe e ON u.id_utilisateur = e.id_utilisateur '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = a.id_utilisateur '
        + 'WHERE u.pseudonyme = ? AND (e.id_utilisateur IS NOT NULL OR a.id_utilisateur IS NOT NULL)';        
        try{
            let results = await pool.query(sql, [pseudo]);
                 
            if(results.length === 1){
                return this.buildEmployeOrAdherent(results[0]);           
            }
            else{ return false; }
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.findByPseudo: " + err);
            return false;
        }   
    },

    findById: async function(id) {
        let sql = 'SELECT *, u.id_utilisateur FROM utilisateur u '  
        + 'LEFT OUTER JOIN employe e ON u.id_utilisateur = e.id_utilisateur '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = a.id_utilisateur '
        + 'WHERE u.id_utilisateur = ? AND (e.id_utilisateur IS NOT NULL OR a.id_utilisateur IS NOT NULL)';               
        try{
            let results = await pool.query(sql, [id]);
              
            if(results.length === 1){
                return this.buildEmployeOrAdherent(results[0]);         
            }
            else{ return false; }
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.findById: " + err);
            return false;
        }   
    },

    buildEmployeOrAdherent: function(user){
        return user.categorie_utilisateur === 'EMPLOYE' ? 
        new Employe(user.nom, user.prenom, user.date_naissance, user.sexe, 
            user.id_utilisateur, user.pseudonyme, user.pwd, user.categorie_utilisateur, user.matricule, user.categorie_employe) :
        new Adherent(user.nom, user.prenom, user.date_naissance, user.sexe, 
            user.id_utilisateur, user.pseudonyme, user.pwd, user.categorie_utilisateur, user.telephone, user.date_cotisation);  
    },

    insertEmploye: async function(user){
        return this.insertUtilisateur(user, 'EMPLOYE');
    },

    insertAdherent: async function(user){
        return this.insertUtilisateur(user, 'ADHERENT');
    },

    insertUtilisateur: async function(user, categorieUtilisateur){
        let sql = 'INSERT INTO utilisateur (nom, prenom, pwd, pseudonyme, date_naissance, sexe, categorie_utilisateur) VALUES (?,?,?,?,?,?,?)';
        let utilisateur = [user.nom, user.prenom, user.password, user.pseudo, user.dob, user.sexe, categorieUtilisateur];
        try{
            let results = await pool.query(sql, utilisateur);
            return (categorieUtilisateur === 'EMPLOYE') ? //Pour les adhérents, on considère la cotisation réglée le jour de l'inscription 
            {id: results.insertId, categorieEmploye: user.categorieEmploye} : {id: results.insertId, telephone: user.telephone, dateCotisation: new Date()};
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.insertUtilisateur: " + err);
            throw err; // pass it to the catch where it's called
        }
    },

    updateUtilisateur: async function(user){
        let queryParams = [user.nom, user.prenom, user.pseudo, user.dob, user.sexe, user.id];
        let sql = 'UPDATE utilisateur SET nom = ?, prenom = ?, pseudonyme = ?, date_naissance = ?, sexe = ? WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, queryParams);
            return user;
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.updateUtilisateur.");           
            throw err;
        }
    },

    deleteUtilisateur: async function(id){
        let sql = 'DELETE FROM utilisateur WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [id]);
            return true;
        }
        catch(err){
            console.log("DB ERROR UtilisateurDAO.deleteUtilisateur: " + err);
            throw err;
        }
    },

    searchAdherent: async function(keywords, limit, offset){
        let sql = 'SELECT *, u.id_utilisateur FROM utilisateur u '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = a.id_utilisateur '
        + "WHERE (u.pseudonyme LIKE ? OR u.nom LIKE ?) AND categorie_utilisateur = 'ADHERENT'  LIMIT ? OFFSET ?";
        keywords = "%" + keywords + "%";
        let searchParams = [keywords, keywords, limit, offset];
        try{
            let results = await pool.query(sql, searchParams);
            return results.map(user => this.buildEmployeOrAdherent(user));
        }
        catch(err){
            console.log("DB ERROR UtilisateurDAO.searchAdherent: " + err);
            return false;
        }
    },

    searchCountAdherent: async function(keywords){
        let sql = 'SELECT COUNT(*) total FROM utilisateur u '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = a.id_utilisateur '
        + "WHERE (u.pseudonyme LIKE ? OR u.nom LIKE ?) AND categorie_utilisateur = 'ADHERENT'";
        keywords = "%" + keywords + "%";
        let searchParams = [keywords, keywords];
        try{
            let results = await pool.query(sql, searchParams);   
            return results[0].total;        
        }
        catch(err){
            console.log("DB ERROR UtilisateurDAO.searchCountAdherent: " + err);
            return false;
        }
    }

}

module.exports = UtilisateurDAO;