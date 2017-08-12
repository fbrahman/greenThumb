// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require("../models");

//search
// =============================================================
router.get('/search', (req, res, next) => {
    console.log(req.query);
    let plantName = req.query.plantName;
    db.plants.findAll({
        where: {
            name: {
                $like: `%${plantName}%`
            }
        },
        include:[db.favorites]
    }).then(function (data) {
        let hbsObject = {};
        if (data.length === 1) {
            if (req.isAuthenticated()){
                let plantData = data[0];
                let favData = data[0].favorites;
                let favId = 99999;
                let isFav = false;
                let userId = req.user.userId;

                for(let i = 0; i < favData.length; i++){
                    if(favData[i].userId === userId){
                        isFav = true;
                        favId = favData[i].id;
                    }
                }

                hbsObject = {
                    results: plantData,
                    isFav: isFav,
                    favId: favId
                }
            } else {
                hbsObject ={
                    results:data[0]
                }
            }
            res.render('plant', hbsObject);
        } else {
            console.log("Number of results: ", data.length);
            hbsObject = {
                results: data,
                searchTerm: plantName,
                resultCount: data.length
            }
            res.render('results', hbsObject);
        }
    });
});

module.exports = router;