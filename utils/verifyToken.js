const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken')

function verifyToken(req){
    try{
        const decoded = jwt.verify(req.cookies.token,SECRET);
        return decoded;
    }
    catch(err){
        // console.log(err);
        return false;
    }
}

module.exports = verifyToken;