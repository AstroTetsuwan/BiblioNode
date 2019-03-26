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

    insertTheme: async function (theme){
        try{
            let results = await pool.query('INSERT INTO theme (code_theme, libelle, theme_parent) VALUES (?,?,?)', 
            [theme.code, theme.libelle, (theme.themeParent || 'NULL')]);
            return results.insertId;
        } catch(err){
            console.log("DB ERROR : ThemeDAO.insertTheme : " + err);
            throw err;
        }
    },
    
    updateTheme: async function(theme){
        try{
            let results = await pool.query('UPDATE theme SET code_theme = ?, libelle = ?, theme_parent = ? WHERE code_theme = ?', 
                [theme.code, theme.libelle, (theme.themeParent || 'NULL'), theme.code]);
            return true;
        } catch(err){
            console.log("DB ERROR : ThemeDAO.updateTheme : " + err);
            throw err;
        }
    }
}

module.exports = ThemeDAO;