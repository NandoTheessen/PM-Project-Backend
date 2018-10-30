const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

 module.exports = { 
    letsMakeAToken(user){
        console.log('inside token',user)
        const timestamp = new Date().getTime();
        const payload = {
            sub: user.id,
            iat: timestamp,
            username: user.username,
            externalID: user.externalID,
            // admin: user.admin
        };
        const options = {
            expiresIn: '10d'
        };
        return jwt.sign(payload, secret, options)
    }
}

