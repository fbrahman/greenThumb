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

//search
router.get('/search',(req, res, next) => {
    let plantName = req.body.plantName;
    db.plants.findAll({
        where: {
            name: plantName
        }
    }).then(function(data) {
        let hbsObject = {
            results: data
        }
    res.render('results', hbsObject);
    });
});

module.exports = router;



