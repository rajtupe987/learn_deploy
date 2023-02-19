const express=require("express");
const {notemodel}=require("../model/note.model")
const noteRouter=express.Router();



// For getting all the todos which are crated by the users
noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await notemodel.find();
        res.send(notes)
    } catch (error) {
        res.send({"msg":"error while getting the notes"})
    }
})


// For posting/creating the the todos by the logged in users
noteRouter.post("/create",async(req,res)=>{

    try {
        const payload=req.body;

        const note=new notemodel(payload);
    
        await note.save();
    
        res.send({"msg":"note created"})
    } catch (error) {
        res.send({"msg":"Error"})
    }


});

// For updating the todo
noteRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    const note=await notemodel.findOne({"_id":id});
    const userId_in_note=note.userId;
    const userId_making_req=req.body.userId
    try {
        if(userId_making_req!==userId_in_note){
            res.send({"msg":"You are not Authorized"})
        }else{
            await notemodel.findByIdAndUpdate({_id:id},payload);
            res.send({"msg":`note with id ${id} has been updated`})
        }
        
    } catch (error) {
        res.send({"msg":"Error while updating the note"});
        console.log(error)
    }
});



// for deleting the todo
noteRouter.delete("/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        await notemodel.findByIdAndDelete({_id:id});
        res.send({"msg":`note with id ${id} has been deleted`})
    } catch (error) {
        res.send({"msg":"Error while deleting the note"})
    }
});

module.exports={
    noteRouter
}