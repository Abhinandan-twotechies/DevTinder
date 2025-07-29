const express = require("express");
require('./config/databse');
const app = express();
const port = 9898;
const connectDB = require("./config/databse");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes")
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");

// MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



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

































