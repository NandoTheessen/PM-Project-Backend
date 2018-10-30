const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const db = require('../data/dbConfig')
const { 
    findUser,
    makeUser
} = require('../controller/index')

const { GOOGLE_ID, GOOGLE_SECRET} = process.env;
const passportConfig = {
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: 'http://localhost:5000/api/customers/redirect'
};


passport.use(new passportGoogle.OAuth2Strategy(passportConfig, async function (request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    try {
        const { id, displayName } = profile;
        // need to consider changing db to hold all emails
        const email = profile.emails[0].value;
        const searchUser = await findUser(id);
        console.log('searchUser', searchUser)
        if(!searchUser){
            const createUser = await makeUser(id, displayName, email);
            return done(null, createUser);
        } else{
            return done(null, searchUser);
        }
    } catch(err) {
        console.log('GoogleAuth Error', err);
    };
}));