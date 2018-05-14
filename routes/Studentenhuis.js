const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

});

// Fall back, display some info
router.all('*', (req, res) => {
    res.status(500);
    res.json({
        "description": "Unknown endpoint, go away you hacker"
    });
});

module.exports = router;