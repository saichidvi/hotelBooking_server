//importing the modules which are inbuilt
const express = require('express');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const cors = require('cors');

//importing the third  party modules 
const auth = require('./routes/auth');
const hotels = require('./routes/hotels.js');
const rooms = require('./routes/rooms.js');
const users = require('./routes/users.js');
const app = express();


//Setting up conenctions with the backend ....
const mb = "mongodb+srv://saichidvigupta1:saichidvi@cluster0.pfbbg.mongodb.net/HotelBooking?retryWrites=true&w=majority"
mongoose.connect(mb,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => console.log("Connection succesfully established with the Mongodb Atlas Cloud DataBase... ")).catch((err) => console.log(err));

//useful for sending the files in the form of json format...
app.use(express.json());
app.use(cookie());
app.use(cors());

app.use('/api/auth',auth);
app.use('/api/rooms',rooms);
app.use('/api/hotels',hotels);
app.use('/api/users',users);

app.get('/',(req,res) => {
    res.send("Hello");
})



app.listen(8800,() => {
    console.log("Helllo server is ready to use");
})