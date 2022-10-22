const jswt = require("jsonwebtoken");
const createError = require("./errorfunc");
const jwts = require("../secret");
const User = require("../models/User");

const verifyToken = (req,res,next) => {
    try {
        const token = req.cookies.access_token;
        if(!token) {
            return next(createError(404,"You are not authenticated.."));
        }
        jswt.verify(token,jwts,(err,result) => {
            if(err) {
                return next(createError(404,"Verification is not Successfull.."));
            }
            req.user = result;
            next();
        });
    }
    catch(err) {
        next(err);
    }
}



const verifyUser = async (req,res,next) => {
    try {
        console.log(req.user);
        if(req.user.id === req.params.id  || req.user.isAdmin){
            next();
        }
        else {
            next(createError(404,"You are not verifed usr"));
        } }
    catch(err) {
        next(err);
    }}




const verifyAdmin = async (req,res,next) => {
        try {
            if(req.user.isAdmin){
                next();
            }
            else {
                next(createError(404,"You are not allowed to change caze u are not admin"));
            } }
        catch(err) {
            next(err);
        } }


module.exports = {verifyToken,verifyAdmin,verifyUser};