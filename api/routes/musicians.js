const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");

// Load input validation
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

// Load Musician Model
const Musician = require('../models/Musician');

router.post("/login", (req, res) => {
    //Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find Musician by email
    Musician.findOne({ email }).then(musician => {
        //Check if musician exists
        if(!musician) {
            return res.status(404).json({ emailnotfound: "Email not found"});
        }

        //Check password
        bcrypt.compare(password, musician.password).then(isMatch => {
            if(isMatch) {
                //Musician matched
                //Create JWT Payload
                const payload = { 
                    id: musician.id,
                    name: musician.artistName
                };

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.post("/register", (req, res) => {
    //Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    Musician.findOne({ email: req.body.email}).then(musician => {
        if(musician) {
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newMusician = new Musician({
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newMusician.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }
                    newMusician.password = hash;
                    newMusician.save()
                        .then(musician => req.json(musician))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;