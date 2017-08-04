// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();

//landing page
router.get('/', (req, res, next) => {
    res.render('index');
});

//registration page
router.get('/registration', (req, res, next) => {
    res.render('registration');
});


module.exports = router;



