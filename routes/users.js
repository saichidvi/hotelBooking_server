const express = require('express');
const router = express.Router();
const {updateUser,deleteSingleUser,getSingleUser,getAllUsers,deleteAllUsers} = require("../controllers/users");
const {verifyToken,verifyAdmin,verifyUser} = require("../utils/verigfications");


//router.use(verifyToken);
//to get details of all the Users
router.get('/',getAllUsers); 

//to get details of single  user with specified id 
router.get('/:id',verifyUser,getSingleUser); 


//to update a single user document with specified id
router.put("/:id",verifyUser,updateUser);

//to delete a single user with specified id 
router.delete('/:id',verifyUser,deleteSingleUser);

//to delete all the users 
router.delete('/',verifyAdmin,deleteAllUsers);

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