const token = require('../auth/token')
const passport = require('passport')
const { REACT_REDIRECT } = process.env;

// this is just setting up the passport middlewear. it is added to the '/customers/register' route
const googleStart = passport.authenticate('google', {
    session: false, scope: ['openid', 'profile', 'email'] 
});

// this is just setting up the passport middlewear. it is added to the '/customers/redirect' route
const googleAuth = passport.authenticate('google', { session: false });

// google will have sent the user here after.  this is also on the '/customers/redirect' route
// if a user gets to this point, they have successfully logged into google
// we make a toke and sent a redirect to the front end `http://localhost:3000?token={sometoken}
// this could be changed to any route on the front end if we want to display a custom success msg
// the frontend will need to parse the address to get the token and add it to local storage
const googleRedirect = function(req, res, next) {
    try {
        const makeToken = token.letsMakeAToken(req.user)
        res.redirect(REACT_REDIRECT +'?token=' + makeToken)
    } catch(err){
        next(err);
    }
};

module.exports = {
  googleStart,
  googleAuth,
  googleRedirect
}