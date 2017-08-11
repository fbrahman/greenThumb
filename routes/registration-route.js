// Dependencies
// =============================================================
const express = require('express');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');


const router = express.Router();
const db = require('../models');
//hashing variables
const saltRounds = 10;

//create new user
router.post('/registration/new', (req, res, next) => {
    // console.log(req.body);
    //validation rules for registration fields
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmPassword', 'Passwords do not match, please try again.').equals(req.body.password);

    req.getValidationResult().then((results) => {
        const errors = results.array();
        // console.log(`errors: ${JSON.stringify(errors)}`);
        // console.log(results.isEmpty());
        if (!results.isEmpty()) {
            console.log("errors exist");
            res.render('registration', { errors: errors })
        } else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                db.users.create({ username: req.body.username, email: req.body.email, password: hash })
                    .then((dbUser) => {
                        let user = {id:dbUser.id}
                        req.login(user, (err) => {
                            res.redirect('/favorites')
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        }
    });
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = router;