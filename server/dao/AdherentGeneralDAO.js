var pool = require('../db/db').getPool();

var AdherentGeneralDAO = {
    findAdherentGeneral: async function(){
        try{
            return await pool.query('SELECT * FROM  adherent_general');
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
            return false;
        }
    }
};

module.exports = AdherentGeneralDAO;