const express = require('express');
const port = 8989; 

const app = express();

app.get("/user",(req , res)=>{
    res.send("Get API Calls")
})
app.post("/user",(req , res)=>{
    res.send("Post API calls")
})
app.put("/user",(req , res)=>{
    res.send("Put API calls")
})
app.delete("/user",(req , res)=>{
    res.send("Delete API calls")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})


app.listen(port , ()=>[
    console.log("Server started at port no : "+ port)
])
