// Dependencies
// =============================================================
const express = require('express');
const flash = require('connect-flash');

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
    res.render('login', {message: req.flash('error')});
});

//results page
router.get('/results', (req, res, next) => {
    res.render('results');
});

//temp dashboard page
router.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});

//about page
router.get('/about', (req, res, next) => {
    res.render('about');
});

module.exports = router;



