 const createError = require("../utils/errorfunc.js");
const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie  = require('cookie-parser');
const jwts = require("../secret");

const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash  = bcrypt.hashSync(req.body.password,salt);
        const newUser  =  User({
        username : req.body.username,
        email : req.body.email,
        country : req.body.country,
        city : req.body.city,
        phone: req.body.phone,
        password : hash,
        isAdmin : req.body.isAdmin
       });
       const result = await newUser.save();
       res.status(200).send("User has been created.");
    }
    catch(err) {
        next(err);
    }
};

const login = async (req,res,next) => {
    try {
       const result = await User.findOne({username : req.body.username});
       if(!result) {
        next(createError(404,"Error User not found..."));
       }
       const isPasswordCorrect = await bcrypt.compare(req.body.password,result.password);
       if(!isPasswordCorrect){
        next(createError(404,"Incoorect Password Entered.."));
       } 
       console.log(result.isAdmin);     
       const token = jwt.sign({id : result._id,isAdmin : result.isAdmin},jwts);
       const {password,isAdmin,...otherDetails} = result._doc;
       res
       .cookie("access_token",token,{
        httpOnly : true})
       .status(200).json({details : {...otherDetails,isAdmin}});
    }
    catch(err) {
        next(err);
    }
};

module.exports = {register,login};