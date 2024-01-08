const express = require("express");
const router = express.Router();
const User = require("../model/usermodel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()


const signup = async (req, res) => {
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
router.route("/api/v1/signup").post(signup);

module.exports = router;