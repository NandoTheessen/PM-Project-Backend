const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

 module.exports = { 
    letsMakeAToken(user){
        console.log('inside token',user)
        const payload = {
            sub: user.id,
            username: user.username,
            externalID: user.externalID,
            isAdmin: user.isAdmin || false,
        };
        const options = {
            expiresIn: '1h'
        };
        return jwt.sign(payload, secret, options)
    }
}

