var pool = require('../db/db').getPool();
var Auteur = require('../domain/Auteur');

var AuteurDAO = {
    findById: async function(id){
        try{
            let results = await pool.query('SELECT * FROM auteur WHERE ?', {id_auteur: id});
            return results.length === 1 ? new Auteur(results[0].id_auteur, results[0].nom, results[0].prenom) : false;
        } catch(err){
            console.log("DB ERROR : AuteurDAO.findById : " + err);
            throw err;
        }
    },

    findByNomPrenom: async function(nom, prenom){
        try{
            let results = await pool.query('SELECT * FROM auteur WHERE ?', {nom: nom, prenom: prenom});
            return results.length > 0 ? new Auteur(results[0].id_auteur, results[0].nom, results[0].prenom) : false;
        } catch(err){
            console.log("DB ERROR : AuteurDAO.findByNomPrenom : " + err);
            throw err;
        }
    },

    searchByNom: async function(nom){
        try{
            nom = nom + "%";
            console.log(nom);
            let results = await pool.query('SELECT * FROM auteur WHERE nom LIKE ? LIMIT 20', [nom]);      
            console.log(results);   
            console.log(results.sql);   
            return results.length > 0 ? results.map(auteur => new Auteur(auteur.id_auteur, auteur.nom, auteur.prenom)) : false;
        } catch(err){
            console.log("DB ERROR : AuteurDAO.findByNomPrenom : " + err);
            throw err;
        }
    },

    insertAuteur: async function(auteur){
        try{
            let results = await pool.query('INSERT INTO auteur (nom, prenom) VALUES (?,?)', [nom, prenom]);
            return results.insertId;
        } catch(err){
            console.log("DB ERROR : AuteurDAO.insertAuteur : " + err);
            throw err;
        }
    },

    updateAuteur: async function(auteur){
        try{
            let results = await pool.query('UPDATE auteur SET nom = ?, prenom = ? WHERE id_auteur = ?', [auteur.nom, auteur.prenom,auteur.id]);
            return true;
        } catch(err){
            console.log("DB ERROR : AuteurDAO.updateAuteur : " + err);
            throw err;
        }
    }
}

module.exports = AuteurDAO;