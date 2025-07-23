const express = require("express");
require('./config/databse');
const app = express();
const port = 9898;
const connectDB = require("./config/databse");
const User = require("./models/user");



// Entering static data in databse
app.post("/signup", async(req, res)=>{
    
    const user = new User(
        {
        firstName :"Ankit",
        lastNmae:"Gupta",
        emailId:"ankit@gmail.com",
        password:"Ankit@123",
        age:22,
        gender:"Male"

        }
    )
    
    try{
       await user.save();
       res.send("user data saved succesfully");
    }
    catch(err){
        res.send("User data didn't save due to this ERR "+ err);
    }
    
})


// connecting database 
connectDB()
.then(()=>{
    console.log("Database connected succesfully");
    app.listen(port, ()=>{
    console.log("Server started at port no :"+ port);
}) 
})
.catch((err)=>{
    console.log("Database Didn't connected");
    
})




































// const express = require('express');
// require('./config/databse');
// const connectDB = require("./config/databse")
// const port = 9898;
// const app = express();
// // const User = require("./models/user")
// const User = require("./models/user")


// app.post("/signup", async (req, res) => {
//     const user = new User({
//         firstName: "Abhinandan",
//         lastName: "Kumar",
//         emailId: "abhi@gmail.com",
//         password: "Abhi@123",
//         age: "22",
//         gender: "male"
//     })

//     try {
//         await user.save();
//         res.send("user added succesfully")
//     }
//     catch(err){
//         res.status(400).send("ERR saving in user" + err)
//     }

    
// })




// // connecting database
// connectDB()
//     .then(() => {
//         console.log("Database Connected succesfully");
//         app.listen(port, () => [
//             console.log("Server started at port no : " + port)
//         ])
//     }).catch((err) => {
//         console.log("Database cannot connected due to this ERR :" + err);
//     })

