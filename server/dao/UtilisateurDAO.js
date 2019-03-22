var pool = require('../db/db').getPool();


var UtilisateurDAO = {
    findByPseudo: async function(pseudo) {
        let sql = 'SELECT * FROM utilisateur u '  
        + 'LEFT OUTER JOIN employe e ON u.id_utilisateur = e.id_utilisateur '
        + 'LEFT OUTER JOIN adherent a ON u.id_utilisateur = e.id_utilisateur '
        + 'WHERE u.pseudonyme = ? AND e.id_utilisateur IS NOT NULL OR a.id_utilisateur IS NOT NULL'
        let queryParams = [ pseudo ];
        return await pool.query(sql, queryParams);
    }
}

module.exports = UtilisateurDAO;