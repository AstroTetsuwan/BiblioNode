var pool = require('../db/db').getPool();

var EmpruntArchive = {
    insert: async (empruntArchive) => {
        let results = await pool.query('INSERT INTO emprunt_archive (date_emprunt, date_restitution_eff, id_exemplaire, id_utilisateur) VALUES(?,?,?,?)',
        [empruntArchive.dateEmprunt, empruntArchive.dateRestitution, empruntArchive.idExemplaire, empruntArchive.idUtilisateur]);
        return true;
    }
}

module.exports = EmpruntArchive;