const express = require('express');
const router = express.Router();
const auth =  require('../auth/authentication');
const db = require('../datasource/databaseConnection');

router.all( new RegExp("[^(\/login)]"), function (req, res, next) {

    console.log("VALIDATE TOKEN")

    var token = (req.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        } else {
            next();
        }
    });
});


router.route('/login')
    .post( function(req, res) {

        let email = req.body.email || '';
        let password = req.body.password || '';

        db.query("SELECT email, password FROM user WHERE email = ? ",[email], function (err, rows, fields) {
            if (err){
                console.log('Error handler: ' + err.message);
            }
            console.log(rows);
            if(rows.length !== 0) {
                if (email === rows[0].email && password === rows[0].password) {
                    res.status(200).json({"token": auth.encodeToken(email), "email": email});
                }
            } else {
                res.status(401).json({"error": "Invalid credentials, bye"})
            }
        });
    });

module.exports = router;


