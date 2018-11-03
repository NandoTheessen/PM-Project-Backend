const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

 module.exports = { 
    letsMakeAToken(user){
        const payload = {
            username: user.name,
            externalID: user.externalID,
            isAdmin: user.isAdmin || false,
        };
        const options = {
            expiresIn: '1h'
        };
        return jwt.sign(payload, secret, options)
    }
}

