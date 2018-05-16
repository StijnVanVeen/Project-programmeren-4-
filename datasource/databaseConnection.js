var mysql = require('mysql');
const config = require('../config.json');


//bij heroku zou de host 188.166109.108 moeten zijn.
var con = mysql.createConnection({
    host: process.env.DB_HOST || config.dbServer,
    user: process.env.DB_USER || config.dbUsername,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbSchema
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;