const express = require('express');
const router = express.Router();
const users = require('../datasource/users');



router.route('/')
    .post( function(req, res) {

        var email = req.body.email || '';
        var password = req.body.password || '';
        var firstname = req.body.firstname || '';
        var lastname = req.body.lastname || '';
              


    });

module.exports = router;