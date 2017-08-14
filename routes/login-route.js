// Dependencies
// =============================================================
const express = require('express');
const passport = require('passport');

const router = express.Router();
const db = require('../models');

//login user
router.post('/login', passport.authenticate('local',{
    successRedirect:'/favorites',
    failureRedirect:'/login', 
    failureFlash: true
}));

//logout user
router.get('/logout', (req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;