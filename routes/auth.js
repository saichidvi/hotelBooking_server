const express = require('express');
const router = express.Router();
const {register,login} = require("../controllers/auth.js");


router.post('/register',register);
router.post('/login',login);


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