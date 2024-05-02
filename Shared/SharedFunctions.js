const jwt = require('jsonwebtoken')
module.exports = function getUserId(token){
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;

    return userId ;
}