var pool = require('../db/db').getPool();
var Exemplaire = require('../domain/Exemplaire');

var ExemplaireDAO = {
    
    findById: async function(id){
        let queryParams = {id_exemplaire: id};
        try{
            let results =  await pool.query('SELECT * FROM exemplaire WHERE ?', queryParams);
            return results.length === 1 ? new Exemplaire(results[0].id_exemplaire, results[0].date_achat, results[0].isbn, results[0].status_exemplaire) : false;
        } catch(err){
            console.log("DB ERROR : ExemplaireDAO.findById : " + err);
            throw err;
        }
    },

    insertExemplaire: async function(isbn){
        let sql = "INSERT INTO exemplaire (isbn, date_achat, status_exemplaire) VALUES (?,?,?)";
        try {
            let results = await pool.query(sql, [isbn, new Date(), 'DISPONIBLE']);
            return results.insertId;
        } catch(err){
            console.log("DB ERROR : ExemplaireDAO.insertExemplaire : " + err);
            throw err;
        }
    },

    deleteExemplaire: async function(id){
        let sql = "DELETE FROM exemplaire WHERE id_exemplaire = ?";
        try{
            let results = await pool.query(sql,[id]);
            return true;
        } catch(err){
            console.log("DB ERROR : ExemplaireDAO.deleteExemplaire : " + err);
            throw err;
        }
    }

}

module.exports = ExemplaireDAO;