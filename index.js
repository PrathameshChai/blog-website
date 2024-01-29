const express = require("express");
require('dotenv').config();
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const verifyToken = require('./utils/verifyToken')
const fetchUser = require('./utils/fetchUser')
const Blog = require('./models/Blog')
const path = require('path')

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', async (req, res) => {
    try {
        let user = null;

        if (req.cookies.token) {
            const result = verifyToken(req);
            if (result) {
                user = await fetchUser(result.data)
            }
        }
        const blogs = await Blog.find({});

        if (!user) {
            return res.render('pages/index', { blogs });
        }

        return res.render('pages/index', { name: user.name, blogs })
    }
    catch (err) {
        console.log(err)
        return res.status(500).render('pages/error', {
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }

})

app.get('/signup', async (req, res) => {
    try {
        let user = null;

        if (req.cookies.token) {
            const result = verifyToken(req);
            if (result) {
                user = await fetchUser(result.data)
            }
        }

        if (user) {
            return res.redirect('/')
        }
        return res.render('pages/signup');
    }
    catch (err) {
        console.log(err)
        return res.status(500).render('pages/error', {
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }

})

app.get('/login', async (req, res) => {
    try {
        let user = null;

        if (req.cookies.token) {
            const result = verifyToken(req);
            if (result) {
                user = await fetchUser(result.data)
            }
        }

        if (user) {
            return res.redirect('/')
        }
        return res.render('pages/login');
    }
    catch (err) {
        console.log(err)
        return res.status(500).render('pages/error', {
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }

})

app.get('/user/addblog', async (req, res) => {
    try {
        let user = null;

        if (req.cookies.token) {
            const result = verifyToken(req);
            if (result) {
                user = await fetchUser(result.data)
            }
        }

        if (!user) {
            return res.redirect('/login')
        }

        return res.render('pages/addBlog', { name: user.name });
    }
    catch (err) {
        console.log(err)
        return res.status(500).render('pages/error', {
            errorMsg: "Internal Server Error",
            desc: ["Server Error - 500"]
        });
    }

})

app.use('/auth/signup', require('./authentication/signupRouter'))
app.use('/auth/login', require('./authentication/loginRouter'))
app.use('/auth/logout', require('./authentication/logoutRouter'))
app.use('/getblogpost', require('./routes/getBlogRouter'))
app.use('/addblog', require('./routes/blogRouter'))

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        })
    }
    catch (err) {
        console.log('Server Error:')
        console.log(err)
    }
}
startServer()
