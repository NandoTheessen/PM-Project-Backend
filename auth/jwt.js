const passport = require('passport');
const passportJwt = require('passport-jwt');
const db = require('../data/dbConfig')


const { JWT_SECRET } = process.env;
const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: JWT_SECRET,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
    // it is not checking the expired token time
    // const dateNow = new Date();
    console.log(payload.exp, Date.now())
    db('users')
        .where({ id: payload.sub })
        .first()
        .then(user => {
            if(user && payload.exp > Date.now()){
                return done(null, user, payload);
            }else {
                console.log(user)
                return done();
            }
        }).catch(err => {
            console.log('jwt error', err)
        })

}));