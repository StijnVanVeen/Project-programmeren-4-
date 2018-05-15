const express = require('express');
const router = express.Router();
const users = require('../datasource/users');
const db = require('../datasource/databaseConnection');



router.route('/')
    .post( function(req, res) {

        let email = req.body.email || '';
        let password = req.body.password || '';
        let firstname = req.body.firstname || '';
        let lastname = req.body.lastname || '';

        console.log(email, password, firstname, lastname);

        db.query("INSERT INTO user (voornaam, achternaam, email, password) VALUES (?, ?, ?, ?)"), [firstname, lastname, email, password], function (err, result) {
            if (err) throw err;
            console.log(result)
            res.status(200).json(result);
        }
    });

module.exports = router;