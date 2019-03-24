var pool = require('../db/db').getPool();

var EmployeDAO = {
    insertEmploye: async function(user){
        let sql = 'INSERT INTO Employe(id_utilisateur, matricule, categorie_employe) VALUES(?,?,?)';
        let empValues = [user.id, user.id, user.categorieEmploye];
        try{
            let results = await pool.query(sql, empValues);
            return user;
        }
        catch(err){
            console.log("DB ERROR EmployeDAO.insertEmploye: " + err);
            return false;
        }
    },

    findEmployeById: async function(id){
        let sql = 'SELECT * FROM employe WHERE ?';
        try{
            let results = await pool.query(sql, {id_utilisateur: id});
            if(results.length === 1)
                return results[0];
            else
                return null;
        }
        catch(err){
            console.log("DB ERROR EmployeDAO.findEmployeById: " + err);
            return null;
        }
    }
}

module.exports = EmployeDAO;