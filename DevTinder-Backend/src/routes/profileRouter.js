const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

// API to get Profile 
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ERROR("User not found")
    }
    res.send(user)
  }
  catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }

});



module.exports = profileRouter;