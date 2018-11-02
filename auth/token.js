const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

 module.exports = { 
    letsMakeAToken(user){
        console.log('inside token',user)
        const payload = {
            sub: user.id,
            username: user.username,
            externalID: user.externalID,
        };
        // change this to < 24 hours before deploy
        const options = {
            expiresIn: '30d'
        };
        return jwt.sign(payload, secret, options)
    }
}

