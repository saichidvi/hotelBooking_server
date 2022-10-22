const express = require('express');
const router = express.Router();
const {creatSingleHotel,
       updateHotel,
       deleteSingleHotel,
       getSingleHotel,
       getAllHotels,
       countByCity,
       countByType,
       deleteAllHotels,
       getHotelRooms,sentByFeatured} = require("../controllers/hotels.js")
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verigfications");


router.get('/countByCity',countByCity); 
router.get('/countByType',countByType); 
router.get('/',sentByFeatured);
router.get("/rooms/:hotelid",getHotelRooms);

//router.use(verifyToken);

//to get details of all the hotels 
router.get('/home',getAllHotels); 

//to get details of single  hotel with specified id 
router.get('/home/:hotelid',getSingleHotel); 

//to create a single hotel document
router.post('/home',verifyAdmin,creatSingleHotel);

//to update a single hotel document with specified id
router.put("/home/:hotelid",verifyAdmin,updateHotel);

//to delete a single hotel with specified id 
router.delete('/home/:hotelid',verifyAdmin,deleteSingleHotel);

//to delete all the hotels 
router.delete('/home',verifyAdmin,deleteAllHotels);







//using the error function as a middle function.... placing it here means that 
//when ever we approach any error then next will  try to run the middleware error function that i placed here
router.use((err,req,res,next) => {
    const errStatus = err.status || 404;
    const errMessage = err.message || "You find a error .."
    return res.status(errStatus).json({
        "success" : false,
        "status" : errStatus,
        "message" : errMessage,  
        "stack"  : err.stack,
    });
});

module.exports = router ;