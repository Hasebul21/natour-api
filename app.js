const express = require("express");
const app = express();

app.get("/user/:id", (req, res, next)=>{
    console.log("api called");
    console.log("In middle ware 1");
    next();
}, (req, res) =>{
   console.log("in Middleware 2 ");
   res.send("Hello");
});

app.listen(3000, ()=>{
    console.log("server is listening in port 3000")
});