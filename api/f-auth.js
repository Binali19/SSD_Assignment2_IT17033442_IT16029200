//Facebook Authorization
const FacebookStrategy = require('passport-facebook').Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new FacebookStrategy({
            //Replace with your clientID 
            clientID: "558882333617-baikl34kpghcdhe8mp4326q8r1le8nhf.apps.googleusercontent.com", 
            //Replace with your clientSecret 
            clientSecret:"UTKX4SVFexCq7WolNp5Yx0Ka",
            //Replace with your callbackURL
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        (token, refreshToken, user, done) => {
            return done(null, {
                profile: user,
                token: token
            });
        }));
};
