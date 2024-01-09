const express = require("express");
const router = express.Router();
const User = require("../model/usermodel")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()
const { signup } = require("../controller/authcontroller")


router.route("/").post(signup);
module.exports = router