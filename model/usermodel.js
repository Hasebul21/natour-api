const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate : [isEmail, "email address required"]
    },
    password: {
        type: String,
        required : [true , "password ca not be empty"]
    },
    passwordConfirm: {
        type: String,
        required : [true , "password ca not be empty"]
    },
    age: {
        type: Number
    },
    experience: {
        type: Number
    },
    budget: {
        type: Number
    },
    createdDate : {
        required: false,
        type : Date,
        default: Date.now()
    }

});


userSchema.pre("save", async function(next){
    if(this.password !== this.passwordConfirm){
        throw new Error("Password and Confirm Password does not match");
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    this.passwordConfirm = undefined;
    next();
});

const User = new model('User', userSchema);
module.exports = User;