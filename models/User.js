const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        required: true,
    },
},{timestamps: true});

const User = mongoose.model('user',UserSchema);

module.exports = User;