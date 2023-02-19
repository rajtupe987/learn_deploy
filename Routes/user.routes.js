const express = require("express");
const { usermodel } = require("../model/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouts = express.Router();

// For getting all the users which are registed to the website
userRouts.get("/",async(req,res)=>{

    try {
        const users=await usermodel.find();
        res.send(users)
    } catch (error) {
        res.send({"msg":"Error while getting all the users"})
    }
})

// for registerring the new user
userRouts.post("/register", async (req, res) => {

    const { name, age, email, pass } = req.body;

    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            // Store hash in your password DB.

            if (err) {
                res.send({ "msg": "something went wrong" })
            } else {
                const user = new usermodel({ name, age, email, pass: hash });
                await user.save();
                res.send({ "msg": "New user has been created" })
            }
        });

    } catch (error) {
        res.send({ "msg": "something went wrong" })
    }
})


// for login perpose of an user
userRouts.post("/login", async (req, res) => {

    try {
        // Now i can not compaire with pass bacause pass is hash so our email is unique so we can compaire with it..
        const { email, pass } = req.body;
        let user = await usermodel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                // result == true
                if (result) {
                    // this is for taking random token by the help of jwt..
                    let token = jwt.sign({userId:user[0]._id }, "masai")
                    res.send({ "msg": "User Logged in", "token": token })
                }else{
                    res.send({ "msg": "Wrong Credentials" })
                }
            });

        } else {
            res.send({ "msg": "Wrong Credentials" })
        }
    } catch (error) {
        res.send({ "msg": "Somthing went wrong", "error": error.message })
    }
});

//for deleting the user

userRouts.delete("/:id",async(req,res)=>{
    try {
        const userid=req.params.id
        await usermodel.findByIdAndDelete({_id:userid});
        res.send({"msg":"User has been deleted"})
    } catch (error) {
        res.send({"msg":"Error while deleting the user"})
    }
})


//For updating the user

userRouts.patch("/:id",async(req,res)=>{
    const userid=req.params.id;
    const payload=req.body;

    try {
        await usermodel.findByIdAndUpdate({_id:userid},payload);
        res.send({"msg":`id of ${userid} user has been updated`});
    } catch (error) {
        res.send({"msg":"Error while updating the user"})
    }
})

module.exports = {
    userRouts
}

