const token = require('../auth/token')
const passport = require('passport')
const status = require('../utils/httpStatus');
const { 
    findUser,
    putUser,
    addEmail
} = require('../controller/index');
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
}

const getOneFromToken = function getSingleFromToken(req, res, next) {
    try {
        res.status(status.ok).json(req.user)
    } catch(err) {
        err['statusCode'] = 404;
        next(err);
    }
}

const getOneFromId = async function getSingleFromId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await findUser(id);
        res.status(status.ok).json(user);
    } catch(err) {
        err['statusCode'] = 404;
        next(err);
    }
}

const put = async function putSingleFromId(req, res, next) {
    try {
        const { id } = req.params;
        const { address, phone, name } = req.body;
        const toUpdate = { address, phone, name }
        const putReturn = await putUser(id, toUpdate);
        res.status(status.ok).json(putReturn)
    } catch(err) {
        err['statusCode'] = 400;
        next(err);
    }
}

const postEmail = async function postNewEmail(req, res, next) {
    try {
        const { externalID } = req.user;
        const { email } = req.body;
        const newEmail = { cust_id: externalID, email: email }
        const postingEmail = await addEmail(newEmail);
        res.status(status.created).json(postingEmail);
    } catch(err) {
        err['statusCode'] = 400;
        next(err);
    }
}

module.exports = {
    googleStart,
    googleAuth,
    googleRedirect,
    getOneFromToken,
    getOneFromId,
    put,
    postEmail
};
