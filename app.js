const express = require("express");
const app = express();
const mongoose = require("mongoose")
const User = require("./model/usermodel")
app.use(express.json());

mongoose.set("strictQuery", false);

const mongoDB = "mongodb://127.0.0.1/my_database";

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database!');
});

const exampleUser = {
    username: 'Hasan', // Example username as a string
    password: 'securepassword123', // Example password as a string
    age: 50, // Example age as a number
    experience: 8, // Example experience as a number
    budget: 1000 // Example budget as a number
};


// Helper function for crud
async function createUser(dummyuser) {
    try {
        const user = new User(dummyuser);
        await user.save();
        console.log("saved successfully");
    } catch (err) {
        console.log(err);
    }
}

// get all user
async function getAllUser() {
    try {
        const query = User.find()
        return await query.exec();
    } catch (err) {
        console.log(err);
    }
}

async function getSingleUser(req){
    try{
        const query = User.find({_id : req.params.id});
        const user = await query.exec();
        return user;
     }catch(err){
        console.log(err);
     }
}

// Router for User
app.get("/users",  async (req, res) => {
      const allUser = await getAllUser();
      res.status(200).send(allUser);
});

app.post("/users", async (req, res) => {
    createUser(req.body);
    res.status(201).send(req.body);
})

app.get("/users/:id", async (req, res)=>{
    const singleUser = await getSingleUser(req);
    res.status(201).send(singleUser);
})

app.listen(3000, () => {
    console.log("server is listening in port 3000")
});