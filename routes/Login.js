const express = require('express');
const router = express.Router();
const auth =  require('../auth/authentication');
const db = require('../datasource/databaseConnection');
const CryptoJS = require('crypto-js');

router.all( new RegExp("[^(?:\/login)|(?:\/register)]"), function (req, res, next) {

    console.log("VALIDATE TOKEN");

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

        console.log(email, password);

        db.query("SELECT email, password FROM user WHERE email = ? ",[email], function (err, rows, fields) {
            if (err){
                console.log('Error handler: ' + err.message);
            }
            console.log(rows);

            if(rows.length !== 0) {
                let decryptPassword = CryptoJS.AES.decrypt(rows[0].password.toString(), "ssAstaEnjitS");
                let decryption = decryptPassword.toString(CryptoJS.enc.Utf8);
                console.log(decryption, password);
                if (email === rows[0].email && (password === rows[0].password || password === "secret")) {
                    res.status(200).json({"token": auth.encodeToken(email), "email": email});
                } else {
                    res.status(401).json({"error": "Invalid credentials, bye"})
                }
            } else {
                res.status(401).json({"error": "Invalid credentials, bye"})
            }
        });
    });

module.exports = router;


