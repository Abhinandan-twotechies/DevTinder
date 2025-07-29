const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        // custom validation
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is Default about"
    },
    skills: {
        type: [String],
    },
    last_login: {
        type: Date,
        default: null
    }

}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    console.log(user);
    
    const token = await jwt.sign({
            _id: user._id,
            last_login: user.last_login,
        },
        "Dev@tinder123", {
            expiresIn: "7d"
        }
    );
    return token;
}

const User = mongoose.model("User", userSchema);
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