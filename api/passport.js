const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Musician = mongoose.model("musicians");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Musician.findById(jwt_payload.id)
                .then(musician => {
                    if(musician) {
                        return done(null, musician);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};