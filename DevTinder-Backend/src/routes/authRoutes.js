const express = require("express");
const authRouter = express.Router();
const validateSignupData = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user")



// SIGN-UP API
authRouter.post("/signup", async (req, res) => {
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
authRouter.post('/login', async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;
        const user = await User.findOne({
            emailId: email
        });
        // console.log(user.password);
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPassValid = await bcrypt.compare(password, user.password);

        if (isPassValid) {
            // create a JWT Token
            const token = await user.getJWT();
            //   console.log(token);

            // Add the token to cookie and send the cookie as response 
            res.cookie("token", token)
            res.send("Login Succesfully")
        } else {
            throw new Error("Invalid Credentials");

        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

// LOG-OUT API
authRouter.post('/logout', async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.send("User Logged Out Succesfully");
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})

module.exports = authRouter;