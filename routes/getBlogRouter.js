const express = require("express");
const Blog = require("../models/Blog");

const getBlogRouter = express.Router();

getBlogRouter.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById({_id:id});
        if(!blog){
            return res.send('No Blog Found!')
        }

        return res.render('pages/blog',{blog});
    } 
    catch (err) {
        console.log(err);
        return res.status(500).render('pages/error',{
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }
});

module.exports = getBlogRouter;
