const express = require('express');
const router = express.Router();
const db = require('../datasource/databaseConnection');



router.get('/', (req, res) => {
    db.query("SELECT * FROM studentenhuis;", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

//
// studentenhuis
//

router.get('/:huisId', (req, res, next) => {
    const huisId = req.params.huisId || '';

    db.query("SELECT * FROM studentenhuis WHERE ID = " + huisId  + ";", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

router.put('/:huisId', (req, res, next) => {

});

router.delete('/:huisId', (req, res, next) => {

});

//
//maaltijden
//

router.route('/:huisId/maaltijd')
    .post((req, res, next) => {

});

router.get('/:huisId/maaltijd', (req, res, next) => {
    const huisId = req.params.huisId || '';

    db.query("SELECT * FROM maaltijd WHERE StudentenhuisId = " + huisId + ";", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

router.get('/:huisId/maaltijd/:maaltijdId', (req, res, next) => {
    const huisId = req.params.huisId || '';
    const maaltijdId = req.params.maaltijdId || '';

    db.query("SELECT * FROM maaltijd WHERE ID = " + maaltijdId + " AND StudentenhuisId = " + huisId + ";", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

router.put('/:huisId/maaltijd/:maaltijdId', (req, res, next) => {

});

router.delete('/:huisId/maaltijd/:maaltijdId', (req, res, next) => {

});


//
// deelnemers
//

router.route('/:huisId/maaltijd/:maaltijdId')
    .post((req, res, next) => {

    });

router.get('/:huisId/maaltijd/:maaltijdId/deelnemers', (req, res, next) => {
    const huisId = req.params.huisId || '';
    const maaltijdId = req.params.maaltijdId || '';

    db.query("SELECT * FROM `view_deelnemers` WHERE MaaltijdID = " + maaltijdId + " AND StudentenhuisId = " + huisId + ";", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

router.delete('/huisId/maaltijd/:maaltijdId/deelnemers', (req, res, next) => {

});


//
// Fall back, display some info
//
router.all('*', (req, res) => {

});

module.exports = router;