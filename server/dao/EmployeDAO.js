var pool = require('../db/db').getPool();

var EmployeDAO = {
    insertEmploye: async function(user){
        let sql = 'INSERT INTO employe(id_utilisateur, matricule, categorie_employe) VALUES(?,?,?)';
        let empValues = [user.id, user.id, user.categorieEmploye];
        try{
            let results = await pool.query(sql, empValues);
            return user;
        }
        catch(err){
            console.log("DB ERROR EmployeDAO.insertEmploye: " + err);
            throw err;
        }
    },

    findAll: async function(){
        let sql = 'select * from utilisateur left outer join employe on utilisateur.id_utilisateur = employe.id_utilisateur';
        try{
            return await pool.query(sql);             
        } catch(err){
            console.log("DB ERROR UtilisateurDAO.findAll: " + err);
            throw err;
        }
    },
    //THIS FUNCTION IS USELESS -> CHECK IT OUT
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
            throw err;
        }
    },

    updateEmploye: async function(user){
        let sql = 'UPDATE employe SET categorie_employe = ? WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [user.categorieEmploye, user.id]);
            return user.id;
        }
        catch(err){
            console.log("DB ERROR EmployeDAO.updateEmploye: " + err);
            throw err;
        }
    },

    deleteEmploye: async function(id){
        let sql = 'DELETE FROM employe WHERE id_utilisateur = ?';
        try{
            let results = await pool.query(sql, [id]);
            return id;
        }
        catch(err){
            console.log("DB ERROR EmployeDAO.deleteEmploye: " + err);
            throw err;
        }
    }
}

module.exports = EmployeDAO;