const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const createError  = require("../utils/errorfunc.js");

const createRoom = async(req,res,next) => {
    try {
        const newroom = new Room(req.body);
        const result = await newroom.save();
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelid,{$push : {rooms : newroom.id}});
            res.status(200).json(newroom);
        }
        catch(err) 
        {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

const updateRoom = async(req,res,next) => {
    try {
        await Room.findByIdAndUpdate((req.params.id),{$set : req.body});
        res.status(200).send("Ypur Room is Updated");
    }
    catch(err) 
    {
        next(err);
    }
}

const deleteRoom =async (req,res,next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            const result = await Hotel.findByIdAndUpdate(req.params.hotelid,{$pull : {rooms : req.params.id}});
            res.status(200).send("Room is deleted");
        }
        catch(err) {
            next(err);
        }
    }
    catch(err) {
        next(err);
    }
}



const getRoom =async (req,res,next) => {
    try {
        const result = await Room.findById(req.params.id);
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}

const getAllRooms = async(req,res,next) => {
    try {
        const result = await Room.find();
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}


const updateRoomAvailability = async(req,res,next) => {
    try {
        console.log("hello");
        await Room.updateOne({"roomNumbers._id" : req.params.roomid},{$push : {"roomNumbers.$.unavailableDates" : req.body.dates}})
        res.status(200).send("Your Room is Updated");
    }
    catch(err) 
    {
        next(err);
    }
}


module.exports = {getAllRooms,getRoom,updateRoom,deleteRoom,createRoom,updateRoomAvailability};

