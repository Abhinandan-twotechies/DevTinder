const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true, 
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        // custom validation
        validate(value){
           if(!["male" , "female" , "others"].includes(value)){
            throw new Error("Gender data is not valid")
           }
        }
    },
    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"This is Default about"
    },
    skills:{
        type:[String],
    }
})

const User = mongoose.model("User" , userSchema);
module.exports = User;


























// const mongoose = require('mongoose')

// // creating Schemas n  
// const userSchema  = new mongoose.Schema({
//     firstName: {
//        type: String
//     },
//     lastName:{
//        type: String
//     },
//     emailId:{
//        type:String
//     },
//     password:{
//         type:String
//     },
//     age:{
//         type:Number
//     },
//     gender:{
//         type:String
//     }
// })

// // creating models

// const User = mongoose.model("User" , userSchema);


// module.exports = User ;
