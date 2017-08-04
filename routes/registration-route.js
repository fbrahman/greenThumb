// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require('../models');

//create new user
router.post('/registration/new', (req, res, next)=>{
    console.log(req.body);
    db.users.create(req.body).then((dbUser)=>{
        res.render('registration');
    }).catch(err =>{
        console.log(err);
    });
})

module.exports = router;