const mongoose = require('mongoose');

const HotelSchema =  mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    type : {
        type : String,
        required : true 
    },
    city : {
        type : String,
        required : true 
    },
    address : {
        type : String,
        required : true 
    },
    distance : {
        type : String,
        required : true 
    },
    Photos : {
        type : [String],
        required : true 
    },
    desc : {
        type : String,
        required : true 
    },
    rating  : {
        type : Number,
        min :0,
        max : 5
    },
    rooms : {
        type : [String],
        required : true 
    },
    cheapestPrice : {
        type : Number,
        required : true 
    },
    featured : {
        type : Boolean,
        default : false
    }
});

const Hotel =  mongoose.model("Hotel",HotelSchema);
module.exports = Hotel;