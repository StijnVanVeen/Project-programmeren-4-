var mysql = require('mysql');
const config = require('../config.json');


//bij heroku zou de host 188.166109.108 moeten zijn.
var con = mysql.createConnection({
    host: config.dbServer,
    user: config.dbUsername,
    password: config.dbPassword,
    database: config.dbSchema
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;