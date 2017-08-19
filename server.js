// Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const flash = require('connect-flash')

//Authentication packages
// =============================================================
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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

//Initiate method override 
// =============================================================
app.use(methodOverride("_method"));

//Authentication setup
// =============================================================
app.use(cookieParser());
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      message   : msg,
      value : value
    };
  }
}));

let options = 
// for heroku
{
  host: 'mna97msstjnkkp7h.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'zla69w4m6v0zqhmy',
  password: 'h9rtxnhtk54qpult',
  database: 'k1afzp5oa9g58g9k'
};

// uncomment for local use
// {
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: 'password',
//   database: 'greenThumb_db'
// };

let sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'sdlfkjdlajsdoijajk',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set Handlebars as the default templating engine.
// =============================================================
let hbs = exphbs.create({
  defaultLayout:'main',
  helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    plantImg: function(img){
        return "/plant/" + img;
    }, 
    plantSearch: function(name){
      let formattedName = name.replace(/\s/, '+');
      return "/search?plantName=" + formattedName;
    }
  }
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Static directory
// =============================================================
app.use(express.static('public'));
app.use('/plant', express.static(__dirname + '/public/assets/images/vegetable_photos'));

// Routes
// =============================================================
let htmlRoute = require('./routes/html-route.js');
let registrationRoute = require('./routes/registration-route.js');
let loginRoute = require('./routes/login-route.js');
let favoritesRoute = require('./routes/favorites-route.js');
let searchRoute = require('./routes/search-route.js');
let apiRoute = require('./routes/api-route.js');

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
})

app.use('/', htmlRoute);
app.use('/', registrationRoute);
app.use('/', loginRoute);
app.use('/', favoritesRoute);
app.use('/', searchRoute);
app.use('/', apiRoute);

//passport login check
// =============================================================
passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username);
    console.log(password);
    db.users.findOne({
      attributes: ['id', 'password'],
      where: { username: username }
    }).then((dbResult) => {
      if (dbResult) {
        let hash = dbResult.password;
        let userId = dbResult.id;

        bcrypt.compare(password, hash, (err, response) => {
          console.log(response);
          if (response) {
            console.log("password correct");
            return done(null, { userId: userId });
          } else {
            console.log("password incorrect");
            return done(null, false, {message: "Incorrect password."});
          }
        });
      } else {
        return done(null, false, {message: "Incorrect user name."});
      }
    }).catch(err => {
      done(err);
    });
  }
));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
  //Uncomment to seed plants table in local db
  // dbSeed();
});
