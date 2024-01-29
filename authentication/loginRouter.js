const express = require("express");
const loginRouter = express.Router();
const User = require("../models/User.js");
const generateToken = require("../utils/jwt.js");
const { validateLoginDetails } = require("../middleware/validate.js");
const bcrypt = require("bcryptjs");
const verifyToken = require('../utils/verifyToken.js')

loginRouter.use(validateLoginDetails);

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if(req.cookies){
      const result = verifyToken(req);
      if(result){
        return res.redirect('/')
      }
    }

    const _user = await User.findOne({ email });

    if (!_user) {
      return res.status(400).render('pages/error',{
        errorMsg: "Bad Request - 400",
        desc: ["User doesn't exists"]
    });
    }

    const result = bcrypt.compareSync(req.body.password, _user.password);

    if (!result) {
      return res.status(400).render('pages/error',{
        errorMsg: "Bad Request - 400",
        desc: ["Password Doesn't match with email"]
    });
    }

    const token = generateToken(_user._id);
    if(!token){
      return res.status(500).render('pages/error',{
        errorMsg: "Internal Server Error",
        desc: ["Server Error - 500"]
    });
    }

    const expiresInDays = 27;
    const expirationTimeInMillis = expiresInDays * 24 * 60 * 60 * 1000;

    const expirationDate = new Date(Date.now() + expirationTimeInMillis);

    res.cookie("token", token, {
      expires: expirationDate,
      httpOnly: true,
    });

    return res.redirect('/');

  } catch (err) {
    console.log(err);
    return res.status(500).render('pages/error',{
      errorMsg: "Internal Server Error",
      desc: ["Server Error - 500"]
  });
  }
});

module.exports = loginRouter;
