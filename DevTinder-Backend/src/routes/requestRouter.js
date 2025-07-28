const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

// API to send connection Requests
requestRouter.post("/sendConnectionRequests", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending connection requests");
  res.send(user.firstName + " is sending requests")
})



module.exports = requestRouter;