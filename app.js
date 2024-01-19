const express = require("express");
const dotenv = require('dotenv');
const userRoutes = require("./routes/userroutes");
const authRoutes = require("./routes/authroutes");
const tourRoutes = require("./routes/tourroutes")
const dbConnectionOpen = require("./dbconfig");
const { Error } = require("./controller/errorcontroller")
const app = express();
app.use(express.json());

// Database connection
dbConnectionOpen();

// global error middleware

// Router Mounting
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/signup", authRoutes);
app.use("/api/v1/tours", tourRoutes)

app.all("*",(req, res, next)=>{
    const err = new Error(`${req.url} is not found`);
    err.statusCode = 500;
    err.status = 'fail'
    next(err);
})

app.use(Error);


app.listen(3000, () => {
    console.log("server is listening in port 3000")
});