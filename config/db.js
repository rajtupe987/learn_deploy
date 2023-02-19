//  This part is for connecting our DB to Server...

// importing mongoose for connecting our DB to Server..
const mongoose=require("mongoose");
// Importing dotenv for hading our DB link...
require("dotenv").config();

// connecting our DB to server
const connection=mongoose.connect(process.env.mongo_url);


//Importing our connection
module.exports={
    connection
}