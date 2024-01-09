const User = require("../model/usermodel")


exports.createNewUser = (req, res) => {
    User.create(req.body).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({
        status : "Failed",
        error : err.message});
    })
}


exports.getAllUser = (req, res) => {
    const query = User.find()
    query.exec().then((data) => {
        return res.status(200).send(data);
    }).catch((err) => {
        return res.status(400).send(err);
    })
}

exports.getUserById = (req, res) => {
    const query = User.find({ _id: req.params.id });
    query.exec().then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.send(400).send(err);
    })
}


exports.updateUser = (req, res) => {
    const query = User.updateOne({ _id: req.params.id }, req.body)
    query.exec().then((data) => {
        res.status(200).send({ data });
    }).catch((err) => {
        res.status(400).send({ err });
    })
}

exports.deleteUserById = (req, res) => {
    const query = User.deleteOne({ _id: req.params.id })
    query.exec().then((data) => {
        res.status(200).send({ data })
    }).catch((err) => {
        res.status(400).send({ err });
    })
}