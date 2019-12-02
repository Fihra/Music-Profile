const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const saltRounds = 10;

// Create Schema
const MusicianSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

MusicianSchema.pre('save', (next) => {
    // Check if document is new or a new password has been set
    if(this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, 
            (err, hashedPassword) => {
                if(err){
                    next(err);
                } else{
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

module.exports = Musician = mongoose.model("musicians", MusicianSchema);