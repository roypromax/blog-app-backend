const express = require("express");
const {UserModel} = require("../models/user.model.js");
const bcrypt = require('bcrypt');

const userRegister = express.Router();

userRegister.post("/",async(req,res)=>{
    const password = req.body.password;
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            const newUser = new UserModel({...req.body,password:hash});
            await newUser.save();
            res.status(200).json({"Message":"New user has been registered"});
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({Error:error});
    }
})

module.exports = {userRegister};