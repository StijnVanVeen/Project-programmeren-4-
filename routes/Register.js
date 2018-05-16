const express = require('express');
const router = express.Router();
const auth =  require('../auth/authentication');
const db = require('../datasource/databaseConnection');
const User = require("../domain/User");


router.route('/')
    .post( function(req, res) {

        let email = req.body.email || '';
        let password = req.body.password || '';
        let firstname = req.body.firstname || '';
        let lastname = req.body.lastname || '';

        let user = new User(firstname, lastname, email, password);

        if(user.firstName === false){
            res.status(401).json({"error" : "Credentials are invalid, please try again"});
        }else {
            db.query("SELECT * FROM user WHERE email = '" + email + "' LIMIT 1", function (err, result) {
               if (err) {
                   res.status(401);
                   console.log('Error handler' + err.message);
               }
               console.log(result);
               if (result.length > 0){
                   console.log(result);
                   res.status(401);
               }else{
                   console.log(email, password, firstname, lastname);

                   let query = "INSERT INTO user (voornaam, achternaam, email, password) VALUES ('" + user.firstName + "', '" + user.lastName + "', '" + user.email + "', '" + user.password + "')";
                   console.log(query);
                   db.query(query);
                   res.status(200).json({"token": auth.encodeToken(email)});
               }
            });
        }
    });

router.get('/', (req, res) => {
    res.status(401).json({"error" : "no GET requests please"});
});

module.exports = router;