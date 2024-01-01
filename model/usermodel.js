const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    experience: {
        type: Number
    },
    budget: {
        type: Number
    }

});

const User = new model('User', userSchema);
module.exports = User;