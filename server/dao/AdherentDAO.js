var pool = require('../db/db').getPool();

var AdherentDAO = {

    insertAdherent: async function(user){
        let sql = 'INSERT INTO adherent(id_utilisateur, telephone, date_cotisation) VALUES(?,?,?)';
        let adherentValues = [user.id, user.telephone, user.dateCotisation];
        try{
            let results = await pool.query(sql, adherentValues);
            return user.id;
        }
        catch(err){
            console.log("DB ERROR AdherentDAO.insertAdherent: " + err);
            return false;
        }
    },

    updateAdherent: async function(user){
        let sql = 'UPDATE adherent SET telephone = ? WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [user.telephone, user.id]);
            return true;
        }
        catch(err){
            console.log("DB ERROR AdherentDAO.updateAdherent: " + err);
            return false;
        }
    },

    deleteAdherent: async function(id){
        let sql = 'DELETE FROM adherent WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [id]);
            return id;
        }
        catch(err){
            console.log("DB ERROR AdherentDAO.deleteAdherent: " + err);
            return false;
        }
    },

    updateCotisation: async function(id, datePaiement){
        let sql = 'UPDATE adherent SET date_cotisation = ? WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [datePaiement, id]);
            return true;
        }
        catch(err){
            console.log("DB ERROR AdherentDAO.updateCotisation: " + err);
            return false;
        }
    }
};

module.exports = AdherentDAO;