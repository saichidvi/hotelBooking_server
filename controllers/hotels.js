const Hotel = require('../models/Hotel.js');
const Room = require("../models/Room.js");
const hotel = require('../models/Hotel.js');
const createError = require('../utils/errorfunc.js');

const creatSingleHotel = async (req,res,next) => {
    try {
         const newHotel = hotel(req.body);
         const result = await newHotel.save();
         res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}


const updateHotel = async (req,res,next) => { 
    try {
        await hotel.findByIdAndUpdate(req.params.hotelid,{$set : req.body});
        res.status(200).send("Hotel is Updated");
    }
    catch(err) {
        next(err);
    }
}

const deleteSingleHotel = async (req,res,next) => {
    try {
        await hotel.findByIdAndDelete(req.params.hotelid);
        res.status(200).send("Hotel is Deleted ");
    }
    catch(err) {
        next(err);
    }
}

 const getSingleHotel = async(req,res,next) => {
    try {
        const singleHotel = hotel.findById(req.params.hotelid);
        const result = await singleHotel;
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}


 const getAllHotels = async(req,res,next) => {
    try {
        const allHotels = hotel.find();
        const result = await allHotels;
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}

const deleteAllHotels = async(req,res,next) => {
    try {
        await hotel.deleteMany();
        res.status(200).send("All the hotels are deleted");
    }
    catch(err) {
        next(err);
    }
}


const countByCity = async(req,res,next) => {
    try {
        const cities = req.query.cities.split(",");
        const list =await Promise.all(cities.map((cityy) => {
            return (Hotel.countDocuments({city : cityy}));
        } ))
        res.status(200).json(list);
    }
    catch(err) {
        next(err);
    }
}

const countByType = async(req,res,next) => {
    try {
       const hotelCount  =await Hotel.countDocuments({type : "hotel"});
       const villaCount  = await Hotel.countDocuments({type : "villa"});
       const resortCount  = await Hotel.countDocuments({type : "resort"});
       const apartmentCount  =await  Hotel.countDocuments({type : "apartment"});
       const cabinCount  = await Hotel.countDocuments({type : "cabin"});
       res.status(200).json([
        {type : "hotel",count : hotelCount},
        {type : "villa",count : villaCount},
        {type : "resort",count : resortCount},
        {type : "apartment",count : apartmentCount},
        {type : "cabin",count : cabinCount},
       ]);
    }
    catch(err) {
        next(err);
    }
}


const sentByFeatured = async(req,res,next) => {
    const {min,max,...others} = req.query;
    try {
        const {limit} = req.query;
        const lis = await Hotel.find({...others,cheapestPrice : {$gt : min || 1 ,$lt : max || 999}}).limit(limit);
        res.status(200).json(lis);
    }
    catch(err)
    {
        next(err);
    }
}


const getHotelRooms = async(req,res,next) => {
    try{
        const getRooms = await Hotel.findById(req.params.hotelid);
        const list = getRooms.rooms;
        const result = await Promise.all(list.map((item) => {
            return(Room.findById(item));
        }))
        console.log(result);
        res.status(200).json(result);
    }
    catch(err) {
     next(err);
      }
}

module.exports = {creatSingleHotel,
                  updateHotel,
                  deleteSingleHotel,
                  getSingleHotel,
                  getAllHotels,
                  countByCity,
                  countByType,
                  deleteAllHotels,
                 sentByFeatured,
                getHotelRooms};