//seeding table
const csv = require ('csv');
const fs = require('fs');
const async = require('async');
const db = require('../models');

let input = fs.createReadStream(__dirname+'/plant_seeds.csv');
let parser = csv.parse({
  columns: true,
  relax: true
});
 
let inserter = async.cargo(function(tasks, inserterCallback) {
    db.plants.bulkCreate(tasks,{logging:false}).then(function() {
        inserterCallback();
      }
    ).catch(err =>{console.log(err)});;
  },
  1000
);
 
parser.on('readable', function () {
  while(line = parser.read()) {
    inserter.push(line);
  }
});
 
parser.on('end', function (count) {
  inserter.drain = function() {
    // doneLoadingCallback();
  }
});
 
let seeding = function(){
    input.pipe(parser);
    console.log("Seeding Complete");
}


module.exports = seeding;