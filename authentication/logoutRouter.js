const  express = require('express')

const logoutRouter = express.Router()

logoutRouter.get('/',(req,res)=>{
    res.clearCookie('token')
    return res.redirect('/')
})

module.exports = logoutRouter;