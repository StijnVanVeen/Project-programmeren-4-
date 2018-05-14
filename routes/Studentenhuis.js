const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

});

router.get('/huisnummer', (req, res, next) => {

});

router.put('/huisId', (req, res, next) => {

});

router.delete('/huisId', (req, res, next) => {

});

//
//maaltijden
//

router.route('/huisId/maaltijd', (req, res, next) => {

});

router.get('/huisnummer/maaltijd', (req, res, next) => {

});

router.get('/huisnummer/maaltijd/maaltijdId', (req, res, next) => {

});

router.put('/huisnummer/maaltijd/maaltijdId', (req, res, next) => {

});

router.delete('/huisnummer/maaltijd/maaltijdId', (req, res, next) => {

});

// Fall back, display some info
router.all('*', (req, res) => {

});

module.exports = router;