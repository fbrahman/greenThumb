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
    db.favorites.findAll({
        where:req.user, 
        include:[db.plants]
    }).then((data)=>{
        console.log(data.length);
        let hbsObject = {
            favCount: data.length,
            fav: data
        }
        res.render('favorites', hbsObject);
        // console.log(JSON.stringify(results[0].plant.name))
    });
});

//add a favorite for the user
// =============================================================
router.post('/favorites/add', (req, res,next) => {
    let userId = req.user.userId || req.user.Id;
    let plantId = req.body.plantID;
    db.favorites.findOrCreate({
        where:{
            userId:userId, 
            plantId:plantId
            }
        }).then((dbFavorite)=>{
            console.log(dbFavorite);
            res.redirect('back');
        })
});

router.delete('/favorites/remove', (req, res, next)=>{
    console.log("in delete", req.body);
    db.favorites.destroy({
        where:req.body
    }).then((dbResults)=>{
        res.redirect('back');
    })
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