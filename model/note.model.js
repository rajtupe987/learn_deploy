const mongoose=require("mongoose");


// Creating structure/Schema for for posting data... from req.body...
const notesSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userId:String
});


// Creating modle and collection in our DataBase...
const notemodel=mongoose.model("note",notesSchema);


// Exporting model....
module.exports={
    notemodel
}