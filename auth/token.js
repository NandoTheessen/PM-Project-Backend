const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

 module.exports = { 
    letsMakeAToken(user){
        const payload = {
            username: user.name,
            externalID: user.externalID,
            isAdmin: user.isAdmin || false,
        };
        // change this to < 24 hours before deploy
        const options = {
            expiresIn: '30d'
        };
        return jwt.sign(payload, secret, options)
    }
}

