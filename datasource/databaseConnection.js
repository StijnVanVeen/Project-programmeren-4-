var mysql = require('mysql');
const config = require('../config.json');

var con = mysql.createConnection({
    host: config.dbServer ,
    user: config.dbUsername,
    password: config.dbPassword,
    database: config.dbSchema
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;