
var pool = require('../db/db').getPool();

var EditeurDAO = {

    /*findAllEditeur: async function(){
        var result;
        try{
            result = await pool.query("SELECT * from editeur");
        } catch(err){
            throw new Error(err);
        }
        return result;
    }*/

    findAllEditeur: async function(){
        return await pool.query("SELECT * from editeur");        
    }

};

module.exports = EditeurDAO;