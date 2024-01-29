const jwt = require("jsonwebtoken");

const expiresInDays = 28;
const expirationTimeInSeconds = expiresInDays * 24 * 60 * 60;

function generateToken(userId) {
  try {
    const SECRET = process.env.SECRET;
    // console.log(SECRET)

    const token = jwt.sign({
        data: userId
    },SECRET,{ expiresIn: expirationTimeInSeconds });

    return token;
  } 
  catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = generateToken;
