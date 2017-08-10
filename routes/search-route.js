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

module.exports = router;