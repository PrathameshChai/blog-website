const mongoose = require('mongoose');
require('dotenv').config();


async function connectDB(){
    try{
        const connection = await mongoose.connect(`mongodb+srv://nayankohare779:${process.env.PASSWORD}@cluster0.narsgn3.mongodb.net/?retryWrites=true&w=majority`);
        console.log('DB connected!');
    }
    catch(err){
        console.log("DB connection error!")
        console.log(err);
    }
}

module.exports = connectDB;