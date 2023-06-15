const express = require("express");
const {connection} = require("./configs/db.js");
const {userRegister} = require("./routes/userRegister.route.js");
const {userLogin} = require("./routes/userLogin.route.js");

const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send("Blog App Backend");
})

app.use("/api/register",userRegister);

app.use("/api/login",userLogin);

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }
    console.log("Server is running at port 8080");
})