const express = require("express");
const {UserModel} = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userLogin = express.Router();

userLogin.post("/",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email:email});
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({username:user.username,email:user.email},process.env.secretKey);
                res.status(200).json({"Message":"Login Successfull",token:token});
            }else{
                console.log(err);
                res.status(400).json({Error:"Wrong Credentials"});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({"Error":error});
    }
})

module.exports = {userLogin};