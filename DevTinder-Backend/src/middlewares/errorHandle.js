const express = require('express');
const port = 9999; 

const app = express();


app.get("/getUserData" , (req , res )=>{
    try{
       throw new Error("mksxnjh");
    }
    catch(err){
      res.status(500).send("Something went wrong contact support team")
    }
})


// app.use('/' , (err , req , res , next)=>{
//     if(err){
//         // logging the errors
//        res.status(500).send("Something went wrong")
//     }
// })




app.listen(port , ()=>[
    console.log("Server started at port no : "+ port)
])
