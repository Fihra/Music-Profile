const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const keys = require("")

// Load input validation
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

// Load Musician Model
const Musician = require('../models/Musician');

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