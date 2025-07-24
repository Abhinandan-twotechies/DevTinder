const express = require("express");
require('./config/databse');
const app = express();
const port = 9898;
const connectDB = require("./config/databse");
const User = require("./models/user");

// MiddleWare
app.use(express.json())

// Entering static data in databse
app.post("/signup", async(req, res)=>{
    
    // -------- Data Saving statically --------------
    // const user = new User(
    //     {
    //     firstName :"Kunal",
    //     lastNmae:"Gaurav",
    //     emailId:"kunal@gmail.com", 
    //     password:"kunal@123",
    //     age:22,
    //     gender:"Male"

    //     }
    // )
    // try{
    //    await user.save();
    //    res.send("user data saved succesfully");
    // }
    // catch(err){
    //     res.send("User data didn't save due to this ERR "+ err);
    // }

    // -------- Data saving dynamically -------------
    try{
       const data = new User(req.body);
       await data.save()
       res.send("Data Saved Succesfully to the database");
    }
    catch(err){
        res.send("Data didn't saved into the database due to this ERR :" + err)
    }
   
})

// USER-API : finding user data by emailID from database
app.get("/user", async(req,res)=>{
      const userEmail = req.body.emailId;
      console.log(userEmail);

      try{
        const user = await User.find({emailId :userEmail});
        res.send(user)
      }
      catch(err){
        console.log("Something went wrong");
      }
      
      
})

// FEED-API : Finding all user data from the data base;
app.get("/feed",async(req,res)=>{
    try{
        const allUserData = await User.find({});
        console.log(allUserData);
        res.send(allUserData);
             
    }
    catch(err){
      console.log("Something went wrong");
    }
})

// Delete API 
app.delete("/user" , async(req , res)=>{
  try{
    const usertTodelete = req.body._id;
    console.log(usertTodelete);
    await User.deleteOne({_id:usertTodelete});
    res.send("UserDeletd Succesfully")
  }
  catch(err){
    res.status(400).send("User can't be deleted due to this ERR :"+err)
  }
  
})

// Update by PATCH
app.patch("/user",async(req,res)=>{

  try{
   const userIDToUpdate = req.body.userId;
   const dataToUpdate = req.body;
   await User.findByIdAndUpdate(userIDToUpdate , dataToUpdate);
   res.send("Userdata updated SuccesFully")
  }
  catch(err){
    res.status(400).send("User can't Updated")
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

