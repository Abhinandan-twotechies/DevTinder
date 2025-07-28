const express = require("express");
require('./config/databse');
const app = express();
const port = 9898;
const connectDB = require("./config/databse");
const User = require("./models/user");
const validateSignupData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// MiddleWare
app.use(express.json())
app.use(cookieParser())

// SIGN-UP API
app.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender
  } = req.body

  // -------- Data saving dynamically -------------
  try {

    // Validation of data
    validateSignupData(req)

    // Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      gender
    })

    // console.log(user);
    const data = new User(user);
    await data.save()
    res.send("Data Saved Succesfully to the database");
  } catch (err) {
    res.status(400).send("Data didn't saved into the database due to this ERR :" + err.message)
  }

})

//LOG-IN API
app.post('/login', async (req, res) => {
  try {
    const { email, password, } = req.body;
    const user = await User.findOne({ emailId: email });
    // console.log(user.password);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassValid = await bcrypt.compare(password, user.password);

    if (isPassValid) {
      // create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "Dev@tinder123" , {expiresIn:"1d"})
      console.log(token);

      // Add the token to cookie and send the cookie as response 
      res.cookie("token", token)
      res.send("Login Succesfully")
    } else {
      throw new Error("Invalid Credentials");

    }
  } catch (err) {
    res.status(400).send("Invalid Credentials")
  }
})

// API to get Profile 
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ERROR("User not found")
    }
    res.send(user)
  }
  catch(err) {
   res.status(400).send("ERROR: "+err.message);
  }

})

// API to send connection Requests
app.post("/sendConnectionRequests" ,userAuth, async(req,res)=>{

      const user = req.user;
      console.log("Sending connection requests");
      res.send(user.firstName+" is sending requests")
})













// connecting database 
connectDB()
  .then(() => {
    console.log("Database connected succesfully");
    app.listen(port, () => {
      console.log("Server started at port no :" + port);
    })
  })
  .catch((err) => {
    console.log("Database Didn't connected");

  })
































































































































// USER-API : finding user data by emailID from database
//   

// FEED-API : Finding all user data from the data base;
// app.get("/feed", async (req, res) => {
//   try {
//     const allUserData = await User.find({});
//     console.log(allUserData);
//     res.send(allUserData);

//   } catch (err) {
//     console.log("Something went wrong");
//   }
// })

// Delete API 
// app.delete("/user", async (req, res) => {
//   try {

//     const usertTodelete = req.body._id;
//     console.log(usertTodelete);
//     await User.deleteOne({
//       _id: usertTodelete
//     });
//     res.send("UserDeletd Succesfully")
//   } catch (err) {
//     res.status(400).send("User can't be deleted due to this ERR :" + err)
//   }

// })

// Update by PATCH
// app.patch("/user/:userId", async (req, res) => {
//   const userIDToUpdate = req.params?.userId;
//   console.log(userIDToUpdate);

//   const dataToUpdate = req.body;

//   try {

//     //Sanatizing at API level
//     const ALLOWED_UPDATES = ["about", "gender", "age", "photoUrl"];
//     const isUpdatedAllowed = Object.keys(dataToUpdate).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdatedAllowed) {
//       throw new Error("Update not allowed");
//     }

//     const user = await User.findByIdAndUpdate(userIDToUpdate, dataToUpdate, {
//       runValidators: true
//     });

//     res.send("Userdata updated SuccesFully")
//   } catch (err) {
//     res.status(400).send("User can't Updated")
//   }


// });

// connecting database 
// connectDB()
//   .then(() => {
//     console.log("Database connected succesfully");
//     app.listen(port, () => {
//       console.log("Server started at port no :" + port);
//     })
//   })
//   .catch((err) => {
//     console.log("Database Didn't connected");

//   })

































