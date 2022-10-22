const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true ,
        unique : true,
    },
    email : {
        type : String,
        required : true ,
        unique : true,
    },
    country : {
        type : String,
        required : true ,
    },
    city  : {
        type : String,
        required : true ,
    },
    phone  : {
        type : String,
        required : true ,
    },
    password : {
        type : String,
        required : true 
    },
},{timestamps: true});

const User = new  mongoose.model("User",UserSchema);
module.exports = User;