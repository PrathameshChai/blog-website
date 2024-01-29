const express = require('express')
const multer = require('multer')
const path = require('path')
const Blog = require('../models/Blog');
const verifyToken = require('../utils/verifyToken')
const fetchUser = require('../utils/fetchUser')

const blogRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..","public"));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({storage})

blogRouter.post('/',upload.single('coverImg'),async(req,res)=>{
    try{
        let user = null;

        if(req.cookies){
            const result = verifyToken(req);
            if(result){
                user = await fetchUser(result.data)
            } 
            else{
                return res.redirect('/login')
            }
        }

        const blog = await Blog.create({title: req.body.title,body: req.body.body,coverImg:req.file?.filename,authorId:user._id,authorName:user.name});
        // console.log(blog)



        return res.render('pages/success',{message: "Blog Created"})
    }
    catch(err){
        console.log(err)
        return res.status(500).render('pages/error',{
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }
  
    
})


module.exports = blogRouter;