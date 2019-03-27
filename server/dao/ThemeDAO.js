var pool = require('../db/db').getPool();
var Theme = require ('../domain/Theme');

ThemeDAO = {
    findByCode: async function(code){
        try{
            let results = await pool.query('SELECT * FROM theme WHERE code_theme = ?', [code]);
            return results.length === 1 ? new Theme(results[0].code_theme, results[0].libelle, results[0].theme_parent) : false;
        } catch(err){
            console.log("DB ERROR : ThemeDAO.findByCode : " + err);
            throw err;
        }
    },
    
    findAll: async function(){
        try{
            let results = await pool.query('SELECT * FROM theme');
            return results.map(r => new Theme(r.code_theme, r.libelle, r.theme_parent));
        } catch(err){
            console.log("DB ERROR : ThemeDAO.findAll : " + err);
            throw err;
        }
    },

    insertTheme: async function (theme){
        try{
            let sql = theme.themeParent ? 'INSERT INTO theme (code_theme, libelle, theme_parent) VALUES (?,?,?)' : 
            'INSERT INTO theme (code_theme, libelle) VALUES (?,?)';
            let params = theme.themeParent ? [theme.code, theme.libelle, theme.themeParent] : [theme.code, theme.libelle];
            let results = await pool.query(sql, params);           
            return results.insertId;
        } catch(err){
            console.log("DB ERROR : ThemeDAO.insertTheme : " + err);
            throw err;
        }
    },
    
    updateTheme: async function(theme){
        try{
            let results = await pool.query('UPDATE theme SET code_theme = ?, libelle = ?, theme_parent = ? WHERE code_theme = ?', 
                [theme.code, theme.libelle, (theme.themeParent || ''), theme.code]);
            return true;
        } catch(err){
            console.log("DB ERROR : ThemeDAO.updateTheme : " + err);
            throw err;
        }
    }
}

module.exports = ThemeDAO;