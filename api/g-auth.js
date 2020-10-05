const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "558882333617-pm46tu0i8v5nsk283f8a151v7iodmnna.apps.googleusercontent.com",
            clientSecret:"TaD_3jV1kl_gj81syxIKVEWE",
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};


