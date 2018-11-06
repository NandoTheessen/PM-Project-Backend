const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const db = require('../data/dbConfig')
const users = require('../controller/index');

const { GOOGLE_ID, GOOGLE_SECRET, PORT} = process.env;

// passport.use();

const strategy = (group = 'customers') => {
    if (group !== 'admins' && group !== 'customers') {
        throw new Error("invalid argument: must be either 'admins' or 'customers'.");
    }

    const passportConfig = {
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: `http://localhost:${ PORT || 5000 }/api/${group}/redirect`,
        passReqToCallback: true,
    };

    return new passportGoogle.OAuth2Strategy(passportConfig, async function (request, accessToken, refreshToken, profile, done) {
        try {
            const { id, displayName } = profile;
            const emails = profile.emails.map(email => {
                let idPropName = group === 'admins' ? 'admin_id' : 'cust_id';
                return { [idPropName]: id, email: email.value}
            });
            // the profile contains information being sent from google about the user.
            // console.log('emails', emails)
            // we check if this google user has logged in before
            // if they have we send that info, if not we create a new user using info from google
            const searchUser = await users[group].findUser(id);
            console.log("searchUser", searchUser)
            if(!searchUser){
                try{
                    const createUser = await users[group].makeUser(id, displayName);
                    await users[group].addEmail(emails);
                    console.log("createUser", createUser)
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
    });
};

passport.use('admins', strategy('admins'));
passport.use('customers', strategy('customers'));