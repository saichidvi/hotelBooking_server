const User = require('../models/User.js');
const createError = require('../utils/errorfunc.js');




const updateUser = async (req,res,next) => { 
    try {
        await User.findByIdAndUpdate(req.params.id,{$set : req.body});
        res.status(200).send("User is Updated");
    }
    catch(err) {
        next(err);
    }
}

const deleteSingleUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Userl is Deleted ");
    }
    catch(err) {
        next(err);
    }
}

 const getSingleUser = async(req,res,next) => {
    try {
        const getSingleUser = User.findById(req.params.id);
        const result = await getSingleUser;
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}


 const getAllUsers = async(req,res,next) => {
    try {
        const allUsers = User.find();
        const result = await allUsers;
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}

const deleteAllUsers = async(req,res,next) => {
    try {
        User.deleteAll();
        res.status(200).send("All the Users are deleted");
    }
    catch(err) {
        next(err);
    }
}


module.exports = {updateUser,deleteSingleUser,getSingleUser,getAllUsers,deleteAllUsers};