const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FacebookStrategy({
            clientID: "558882333617-baikl34kpghcdhe8mp4326q8r1le8nhf.apps.googleusercontent.com",
            clientSecret:"UTKX4SVFexCq7WolNp5Yx0Ka",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        (token, refreshToken, user, done) => {
            return done(null, {
                profile: user,
                token: token
            });
        }));
};