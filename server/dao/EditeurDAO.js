
var pool = require('../db/db').getPool();

var EditeurDAO = {

    findAllEditeur: async function(){
        return await pool.query("SELECT * from editeur");        
    },

    findEditeurById: async function(id){
        let queryParams = {id_editeur: id};
        return await pool.query('SELECT * FROM editeur WHERE ?', queryParams);
    }

};

module.exports = EditeurDAO;