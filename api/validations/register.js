// Import Musician schema
// const Musician = require('../models/Musician.js');

const Validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";

    //Email checks
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password checks
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};



// POST route to register a musician
// app.post('/api/register', (req, res) => {
//     const { email, password } = req.body;
//     const user = new Musician({ email, password });
//     user.save((err) => {
//         if(err){
//             res.status(500)
//                 .send("Error registering new musician please try again.");
//         } else {
//             req.status(200).send("Welcome!");
//         }
//     });
// });