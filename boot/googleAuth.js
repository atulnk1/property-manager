// USED TO DEFINE THE GOOGLE AUTH STRATEGY 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.AUTH_GOOGLE_CALLBACK,

  }, async (accessToken, refreshToken, profile, cb) => {
    // User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //   return cb(err, user);
    // });
    // console.log(accessToken)
    // console.log(profile)
    const newUser = {
        email: profile.emails[0].value,
        name: profile.name.givenName,
        google: {
            id: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName
        }
    }

    try {
        let user = await User.findOne(
            { 'google.id': profile.id }
        )

        if(user) {
            return cb(null, user)
        } else {
            user = await User.create(newUser)
            return cb(null, user)
        }

    } catch (err) {
        
        return cb(err)
    }
    // console.log(profile)
    // console.log(profile.emails[0].value)
    // console.log(profile._json.email)
    // return cb(null, profile)
}
));

passport.serializeUser( (user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser( (id, cb) => {
    User.findById(id)
        .then((user) => {
            cb(null, user);
        })
        .catch(err => {
            return cb(err)
        }) 
});