const express = require('express');
const port = 8989; 

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})
app.use("/hello",(req,res)=>{
    res.send("Hello how are you")
})
app.use("/hii",(req,res)=>{
    res.send("Hii how are you")
})
app.use("/good",(req,res)=>{
    res.send("I am good")
})

app.listen(port , ()=>[
    console.log("Server started at port no : "+ port)
])
