const express = require('express');
const router = express.Router();
const {getAllRooms,getRoom,updateRoom,deleteRoom,createRoom,updateRoomAvailability} = require("../controllers/rooms.js");
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verigfications");

//router.use(verifyToken);

//create a single room
router.post("/:hotelid",createRoom);

//Update a single room using the specified room id
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:roomid",updateRoomAvailability);
//Get details of the room with given id
router.get("/:id",getRoom);

//get details of all the rooms 
router.get("/",getAllRooms);

//delete a single room
router.delete("/:id/:hotelid",deleteRoom);


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