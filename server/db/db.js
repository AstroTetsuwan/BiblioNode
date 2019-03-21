var mysql = require('mysql');
var util = require('util');
var pool = null;

module.exports = {
    getPool: function(){
        if(pool === null){
            pool = mysql.createPool({
                connectionLimit : 10,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: '', //process.env.DB_PASSWORD
                database: process.env.DB_DATABASE
            });

            //allow use of async await for pool.query
            pool.query = util.promisify(pool.query);
        }

        return pool;
    }
}