var pool = require('../db/db').getPool();

var ExemplaireDAO = {

    findById: async function(id){
        let queryParams = {id_exemplaire: id};
        return await pool.query('SELECT * FROM exemplaire WHERE ?', queryParams);
    }

}

module.exports = ExemplaireDAO;