const token = require('../auth/token')
const express = require('express');
const router = express.Router();
const passport = require('passport')
const { REACT_REDIRECT } = process.env;

// const googleStart = function gStart() {
//     console.log('this')
//     passport.authenticate('google', {
//         session: false, scope: ['openid', 'profile', 'email'] 
//     });
    
// }

// const googleRedirect = function gRedirect() {
//     passport.authenticate('google', { session: false }), (req, res) => {
//         token = token.letsMakeAToken(req.user)
//         res.redirect(REACT_REDIRECT +'?token=' + token)
//     }
// }

router.get('/register',
    passport.authenticate('google', {
        session: false, scope: ['openid', 'profile', 'email'] 
    }));

router.get('/redirect',
    passport.authenticate('google', { session: false }), (req, res) => {
        token = letsMakeAToken(req.user)
        res.redirect(REACT_REDIRECT +'?token=' + token)
    });

module.exports = router;