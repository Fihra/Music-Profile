const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/MusicianDB'

//DB Config
mongoose.connect(url, {useNewURLParser: true});

let db = mongoose.connection;

if(!db){
    console.log("Error connecting db");
} else {
    console.log("DB connected successfully");
}

//process.env.PORT is heroku's port
let port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));