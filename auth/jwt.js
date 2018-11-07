const passport = require('passport');
const passportJwt = require('passport-jwt');
const db = require('../data/dbConfig')
const { 
    findUser,
} = require('../controller/index').customers;

const { JWT_SECRET } = process.env;
const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: JWT_SECRET,
};

// this will be used to check a token on protected routes `passport.authenticate(['jwt'], { session: false })`
passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    try{
        const searchUser = await findUser(payload.externalID);
        if(searchUser){
            return done(null, searchUser, payload);
        } else{
            return done();
        }
    }catch(err){
        console.log('jwt error', err)
    }

}));