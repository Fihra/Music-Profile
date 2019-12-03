const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const musicians = require("./routes/musicians");

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//------------------------------------------------
// const url = 'mongodb://localhost:27017/MusicianDB'

// //DB Config
// mongoose.connect(url, {useNewURLParser: true});

// let db = mongoose.connection;

// if(!db){
//     console.log("Error connecting db");
// } else {
//     console.log("DB connected successfully");
// }

//------------------------------------------------
// 2nd way of connecting DB
const db = require("./keys").mongoURI;

//Connect to MongoDB
mongoose.connect(
    db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./passport")(passport);

// Routes
app.use("/api/musicians", musicians);

//process.env.PORT is heroku's port
let port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));