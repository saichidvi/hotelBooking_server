const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true ,
    },
    price : {
        type : Number,
        required : true ,
    },
    maxpeople : {
        type : Number,
        required : true 
    },
    discription : {
        type : String,
        required : true ,
    },
    roomNumbers : [{number : Number ,unavailableDates : {type : [Date]}}]
},{timestamps: true});

const Room =  mongoose.model("Room",RoomSchema);
module.exports = Room;