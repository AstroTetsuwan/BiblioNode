var pool = require('../db/db').getPool();

var AdherentGeneralDAO = {
    findAdherentGeneral: async function(){
        try{
            let results =  await pool.query('SELECT * FROM  adherent_general');
            console.log(results);
            return results[0];
        }
        catch(err){
            console.log("DB ERROR AdherentGeneralDAO.findAdherentGeneral: " + err);
            return [{nb_max_prets: 3, duree_max_prets: 15}];//DEFAULTS
        }
    },

    updateAdherentGeneral: async function(nbMaxPrets, dureeMaxPrets){
        let sql = 'UPDATE adherent_general SET nb_max_prets = ?, duree_max_prets = ?';
        try{
            return await pool.query(sql, [nbMaxPrets, dureeMaxPrets]);
        }catch(err){
            console.log("DB ERROR AdherentGeneralDAO.updateAdherentGeneral: " + err);
            throw err;
        }
    }
};

module.exports = AdherentGeneralDAO;