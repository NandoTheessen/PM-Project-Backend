const passport = require('passport');
const passportJwt = require('passport-jwt');
const db = require('../data/dbConfig')
const { 
    findUser,
} = require('../controller/index')

const { JWT_SECRET } = process.env;
const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: JWT_SECRET,
};

passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
    // it is not checking the expired token time
    const searchUser = await findUser(payload.externalID);
    if(searchUser){
        return done(null, searchUser, payload);
    } else{
        return done();
    }

}));