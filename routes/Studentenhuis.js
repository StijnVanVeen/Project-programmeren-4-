const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

});

router.get('/huisnummer', (req, res, next) => {

});

router.put('/:huisId', (req, res, next) => {

});

router.delete('/:huisId', (req, res, next) => {

});

//
//maaltijden
//

router.route('/:huisId/maaltijd', (req, res, next) => {

});

router.get('/huisId/maaltijd', (req, res, next) => {

});

router.get('/huisId/maaltijd/:maaltijdId', (req, res, next) => {

});

router.put('/huisId/maaltijd/:maaltijdId', (req, res, next) => {

});

router.delete('/huisId/maaltijd/:maaltijdId', (req, res, next) => {

});

// Fall back, display some info
router.all('*', (req, res) => {

});

module.exports = router;