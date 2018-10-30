const token = require('../auth/token')
const passport = require('passport')
const { REACT_REDIRECT } = process.env;

const googleStart = passport.authenticate('google', {
    session: false, scope: ['openid', 'profile', 'email'] 
});

const googleAuth = passport.authenticate('google', { session: false });

const googleRedirect = function(req, res, next) {
    try {
        const makeToken = token.letsMakeAToken(req.user)
        res.redirect(REACT_REDIRECT +'?token=' + makeToken)
    } catch(err){
        next(err);
    }
}

module.exports = {
    googleStart,
    googleAuth,
    googleRedirect
};
