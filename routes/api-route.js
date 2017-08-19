// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require("../models");

router.get('/api', (req, res, next)=>{
    console.log(req.query);
    let optimalSoil = req.query.t;
    let plantName = req.query.pn||'';
    db.plants.findAll({
        attributes:{exclude:['id', 'image', 'createdAt', 'updatedAt']},
        where:{$and:[{
            name:{
                $like: `%${plantName}%`
            },
            optimal_soil:{
                $like: `%${optimalSoil}%`
            } 
        }]}
    }).then((data)=>{
        res.json(data);
    })
})
module.exports = router;