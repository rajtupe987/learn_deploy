
const mongoose=require("mongoose");


// Creating structure/Schema for for posting data... from req.body...
const UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    pass:String
});


// Creating modle and collection in our DataBase...
const usermodel=mongoose.model("user",UserSchema);


// Exporting model....
module.exports={
    usermodel
}