const express = require("express");
const signupRouter = express.Router();
const User = require("../models/User.js");
const generateToken = require("../utils/jwt.js");
const {validateDetails} = require("../middleware/validate.js");
const verifyToken = require('../utils/verifyToken.js')

signupRouter.use(validateDetails);

signupRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(req.cookies){
      const result = verifyToken(req);
      if(result){
        return res.redirect('/')
      }
    }
    const _user = await User.find({ email });

    if (_user.length > 0) {
      return res.status(400).render('pages/error',{
        errorMsg: "User Exists",
        desc: ["User with this email already exists!"]
    })
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    if(!token){
      console.log("Token error")
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

module.exports = signupRouter;
