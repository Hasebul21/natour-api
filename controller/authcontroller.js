const User = require("../model/usermodel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()

exports.signup = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        // check user exist
        if (!user) {
            return res.status(200).json({
                status: "failed",
                message: "user does not exist"
            })
        }
        const isauth = await bcrypt.compare(req.body.password, user.password)

        // check if password is correct
        if (!isauth) {
            return res.status(200).json({
                status: "failed",
                message: "Password does not match"
            })
        }
        // successfuly create token and return it
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT,);
        return res.status(200).json({
            status: "success",
            token: token,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(200).json(err);
    }
}


exports.protectRoutes = async (req, res, next) =>{
    let token;
    if(req.headers?.authorization){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({
            status : "Failed to verify",
            message : "There is no token. validation error"
        })
    }
    let id;
    jwt.verify(token, process.env.JWT_SECRECT, (err, user)=>{
        console.log(user);
        if(err) return res.status(401).json({
            status : "Token is not valid",
            message : "validation error for token"
        });
        id = user.id;
    })
    const user = await User.findById(id)
    if(!user) return res.status(401).json({
        status : "User is not valid",
        message : `User not found with ${id}`
    });
    next();
}