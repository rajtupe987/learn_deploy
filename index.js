const express=require("express");
const {connection}=require("./config/db");
const {noteRouter}=require("./Routes/note.route");
const {authenticate}=require("./middleware/Auth.middleware")
const cors=require("cors");
// this is env variable for not showing our port and our DB link to anyone
require("dotenv").config();

// This is Routs part it will handle all the methods..
const {userRouts}=require("./Routes/user.routes");
// This is the way to use express
const app=express();

// This is for converting data into json format or object format
app.use(express.json());
app.use(cors())

// This is home request
app.get("/",(req,res)=>{
    res.send("WECOME")
});

// This is conneting middlewere to Routes
app.use("/user",userRouts);
app.use(authenticate)
app.use("/notes",noteRouter);



// This is for port running..
app.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("connected to DB")
    } catch (error) {
        console.log("Could't connect to DB")
    }
    console.log(`port is running at ${process.env.port}`)
})

