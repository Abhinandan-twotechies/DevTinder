const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Handle Auth Middleware for all GET and  POST, ... requests

const userAuth = async (req, res, next) => {
   try{
     //Read the token from req cookies 
    const { token } = req.cookies;
    // console.log(token);
    
    if(!token){
        throw new Error("Invalid Token")
    }
    const decodedMsg = await jwt.verify(token, "Dev@tinder123");
    const loggedInUser = decodedMsg._id

    const user = await User.findById(loggedInUser);
    // console.log(user);
    

    if (!user) {
        throw new Error("User not found")
    }

    req.user = user;
    next();

   }
   catch(err){
     res.status(400).send("ERROR : "+ err.message)
   }

};


module.exports = {
    userAuth
}