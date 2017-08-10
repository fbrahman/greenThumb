// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require("../models");

//landing page
router.get('/', (req, res, next) => {
    res.render('index');
});

//registration page
router.get('/registration', (req, res, next) => {
    res.render('registration');
});

//login page
router.get('/login', (req, res, next) => {
    res.render('login');
});

//dashboard
router.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});

//results page
router.get('/results', (req, res, next) => {
    res.render('results');
});

//favorites page
router.get('/favorites', authenticationMiddleware(), (req, res, next) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('favorites');
});

//search
router.get('/search', (req, res, next) => {
    console.log(req.query);
    let plantName = req.query.plantName;
    db.plants.findAll({
        where: {
            name: {
                $like: `%${plantName}%`
            }
        }
    }).then(function (data) {
        let hbsObject = {};
        if (data.length === 1) {
            hbsObject = {
                results: data[0]
            }
            res.render('plant', hbsObject);
        } else {
            console.log("Number of results: ", data.length);
            hbsObject = {
                results: data
            }
            res.render('results', hbsObject);
        }
    });
});

//authentication check middleware
function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
}

module.exports = router;



