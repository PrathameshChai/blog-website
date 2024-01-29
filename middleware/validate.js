const bcrypt = require('bcryptjs');
const path = require('path');

function validateDetails(req,res,next){
    try{
        let {name,email,password} = req.body;
        //removes all the spacings
        name = name.replaceAll(/\s/g,'');
        email = email.replaceAll(/\s/g,'');
        password = password.replaceAll(/\s/g,'');
        
        //validation
        if((!name||!email||!password)||(name.length<2 || email.length<6 || password.length<8)){
            return res.status(400).render('pages/error',{
                errorMsg: "Invalid Credentials",
                desc: ["Credentials are too short, Please ensure that:","your name is at least 2 characters long.","your email is at least 6 characters long.","your password is at least 8 characters long."]
            })
        }

        //password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;

        next();//calls next handler
    }
    catch(err){
        console.log(err.message);
        return res.status(500).render('pages/error',{
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }
}

function validateLoginDetails(req,res,next){
    try{
        let {email,password} = req.body;
        //removes all the spacings
        email = email.replaceAll(/\s/g,'');
        password = password.replaceAll(/\s/g,'');
        
        //validation
        if((!email||!password)||(email.length<6 || password.length<8)){
            return res.status(400).render('pages/error',{
                errorMsg: "Invalid Credentials",
                desc: ["Credentials are too short, Please ensure that:","your email is at least 6 characters long.","your password is at least 8 characters long."]
            })
        }

        next();//calls next handler
    }
    catch(err){
        console.log(err.message);
        return res.status(500).render('pages/error',{
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }
}

module.exports = {validateDetails, validateLoginDetails};