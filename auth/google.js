const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const db = require('../data/dbConfig')

const { GOOGLE_ID, GOOGLE_SECRET} = process.env;
const passportConfig = {
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: 'http://localhost:5000/api/customers/redirect'
};


passport.use(new passportGoogle.OAuth2Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {
    // console.log('request, accessToken, refreshToken, profile,',request, accessToken, refreshToken, profile)
    console.log('something')
    db('users')
        .where({ externalID: profile.id})
        .first()
        .then(user => {
            console.log('inside google.js', user)
            if(!user){
                let newUser = {
                    username: profile.displayName,
                    externalID: profile.id,
                }
                db('users')
                    // this is a bug when using sqlite. in theory this should when moving to postgre
                    .returning(['id', 'username', 'created_at', 'externalID', 'admin'])
                    .insert(newUser)
                    .then(ids => {
                        returnedUser = ids[0];
                        // console.log('new User', returnedUser);
                        return done(null, returnedUser);
                    })
                    .catch(err => console.log('newUser error', err));
            
            }else {
                return done(null, user);
            }
        }).catch(err => console.log('second new user', err))

    
}));