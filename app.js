const express = require("express");
const userRoutes = require("./routes/userroutes")
const dbConnectionOpen = require("./dbconfig")
const app = express();
app.use(express.json());

// Database connection
dbConnectionOpen();


// Router Mounting
app.use(userRoutes);


app.listen(3000, () => {
    console.log("server is listening in port 3000")
});