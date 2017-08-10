// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require("../models");

//favorites page
// =============================================================
router.get('/favorites', authenticationMiddleware(), (req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('favorites');
});

//authentication check middleware
// =============================================================
function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
};

module.exports = router;