const expres = require('express');
const port = 7979;
const app = expres();

app.use("/route", (req, res, next ) => {
    console.log("Request 1");
    // res.send("Request 1 Sent")
    next();
},
(req, res , next) => {
    console.log("Request 2");
    // res.send("Request 2 Sent");
    next()
},
(req, res, next) => {
    console.log("Request 3");
    // res.send("Request 3 Sent");
    // next();
    res.send("Request 3 Sent");
},
)

app.listen(port, () => {
    console.log("Server started at port no : " + port)
})