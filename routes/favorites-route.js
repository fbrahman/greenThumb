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

//add a favorite for the user
// =============================================================
router.post('/favorites/add', (req, res,next) => {
    let userId = req.user.id;
    let plantId = req.body.plantID;
    db.favorites.findOrCreate({where:{userId:userId, plantId:plantId}})
        .then((dbFavorite)=>{
            console.log(dbFavorite);
            res.redirect('back');
        })
});

router.delete('/favorites/remove', (req, res, next)=>{

})

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