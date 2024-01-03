const express = require("express");
const app = express();
const mongoose = require("mongoose")
const User = require("./model/usermodel")
const userRoutes = require("./routes/userroutes")
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

// // Helper function for crud
// const createNewUser = (req, res) => {
//     User.create(req.body).then((data) => {
//         res.status(201).send(data);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })
// }

// // get all user
// const getAllUser = (req, res) => {
//     const query = User.find()
//     query.exec().then((data) => {
//         res.status(200).send(data);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })
// }

// const getUserById = (req, res) => {
//     const query = User.find({ _id: req.params.id });
//     query.exec().then((data) => {
//         res.status(201).send(data);
//     }).catch((err) => {
//         res.send(400).send(err);
//     })
// }


// const updateUser = (req, res) => {
//     const query = User.updateOne({ _id: req.params.id }, req.body)
//     query.exec().then((data) => {
//         res.status(200).send({ data });
//     }).catch((err) => {
//         res.status(400).send({ err });
//     })
// }

// const deleteUserById = (req, res) => {
//     const query = User.deleteOne({ _id: req.params.id })
//     query.exec().then((data) => {
//         res.status(200).send({ data })
//     }).catch((err) => {
//         res.status(400).send({ err });
//     })
// }

const router = express.Router();

// Router for User
// router.route("/users/")
//     .get(getAllUser)
//     .post(createNewUser)

// router.route("/users/:id/")
//     .get(getUserById)
//     .patch(updateUser)
//     .delete(deleteUserById)

app.use(userRoutes);


app.listen(3000, () => {
    console.log("server is listening in port 3000")
});