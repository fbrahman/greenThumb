const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
// =============================================================
const db = require('./models');
const dbSeed = require('./seeds/plant_seeds');

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Set Handlebars as the default templating engine.
// =============================================================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static('public'));

// Routes
// =============================================================
let html = require('./routes/html-route.js');
let registration = require('./routes/registration-route.js');

app.use('/', html);
app.use('/', registration);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  dbSeed();
});
