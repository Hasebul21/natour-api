const User = require("../model/usermodel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()

exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        // check user exist
        if (!user) {
            let err = new Error();
            err.status = 401;
            err.message = "user does not exist";
            return next(err);
        }
        const isauth = await bcrypt.compare(req.body.password, user.password)

        // check if password is correct
        if (!isauth) {
            let err = new Error();
            err.status = 401;
            err.message = "Authetication failed. token is not valid";
            throw err;
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
        err.status = err.status;
        err.message = err.message;
        return next(err);
    }
}


exports.protectRoutes = async (req, res, next) =>{
    let token;
    if(req.headers?.authorization){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        let err = new Error();
        err.status = 401;
        err.message = "There is no token. validation error";
        return next(err)
    }
    
    let id;
    jwt.verify(token, process.env.JWT_SECRECT, (err, user)=>{
        console.log(user);
        if(err) {
            let err = new Error();
            err.status = 401;
            err.message ="validation error for token";
            return next(err)
        }
        id = user.id;
    })

    const user = await User.findById(id)
    if(!user) return res.status(401).json({
        status : "User is not valid",
        message : `User not found with ${id}`
    });
    next();
}