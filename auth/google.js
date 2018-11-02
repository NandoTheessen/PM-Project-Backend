const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const db = require('../data/dbConfig')
const { 
    findUser,
    makeUser,
    addEmail
} = require('../controller/index')

const { GOOGLE_ID, GOOGLE_SECRET} = process.env;
const passportConfig = {
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: 'http://localhost:5000/api/customers/redirect'
};


passport.use(new passportGoogle.OAuth2Strategy(passportConfig, async function (request, accessToken, refreshToken, profile, done) {
    try {
        // the profile contains information being sent from google about the user.
        const { id, displayName } = profile;
        const emails = profile.emails.map(email => {
            return {cust_id: id, email: email.value}
        });
        console.log('emails', emails)
        // we check if this google user has logged in before
        // if they have we send that info, if not we create a new user using info from google
        const searchUser = await findUser(id);
        if(!searchUser){
            try{
                const createUser = await makeUser(id, displayName);
                await addEmail(emails)
                return done(null, createUser);
            } catch(err){
                console.log("Google create user", err)
            }
        } else{
            return done(null, searchUser);
        }
    } catch(err) {
        console.log('GoogleAuth Error', err);
    };
}));