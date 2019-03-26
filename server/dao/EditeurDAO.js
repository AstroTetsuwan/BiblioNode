var pool = require('../db/db').getPool();
var Editeur = require('../domain/Editeur');

var EditeurDAO = {

    findAllEditeur: async function(){
        try { 
            let results = await pool.query("SELECT * from editeur");  
            return results;
        } catch(err){
            console.log("DB ERROR EditeurDAO.findAllEditeur: " + err);
            throw err;
        }     
    },

    findEditeurById: async function(id){
        let queryParams = {id_editeur: id};
        try { 
            let results = await pool.query('SELECT * FROM editeur WHERE ?', queryParams);
            return (results.length === 1) ? new Editeur(results[0].id_editeur, results[0].nom_editeur, results[0].ville) : false;
        } catch(err){
            console.log("DB ERROR EditeurDAO.findEditeurById: " + err);
            throw err;
        }  
    },

    findEditeurByNom: async function(nom){
        let queryParams = {nom_editeur: nom};
        try { 
            let results = await pool.query('SELECT * FROM editeur WHERE ?', queryParams);
            return (results.length > 0) ? new Editeur(results[0].id_editeur, results[0].nom_editeur, results[0].ville) : false;
        } catch(err){
            console.log("DB ERROR EditeurDAO.findEditeurByNom: " + err);
            throw err;
        }  
    },

    insertEditeur: async function(editeur){
        let queryParams = [editeur.nom, editeur.ville];
        try{
            let results = await pool.query('INSERT INTO editeur (nom_editeur, ville) VALUES (?, ?)', queryParams);
            return results.insertId;
        } catch(err){
            console.log("DB ERROR EditeurDAO.insertEditeur: " + err);
            throw err;
        }  
    },

    updateEditeur: async function(editeur){
        let queryParams = [editeur.nom, editeur.ville, editeur.id];
        try{
            let results = await pool.query('UPDATE editeur SET nom_editeur = ?, ville = ? WHERE id_editeur = ?', queryParams);
            return true;
        } catch(err){
            console.log("DB ERROR EditeurDAO.insertEditeur: " + err);
            throw err;
        }  
    }

};

module.exports = EditeurDAO;