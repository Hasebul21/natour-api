const User = require("../model/usermodel")


exports.createNewUser = (req, res) => {
    User.create(req.body).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        err.status = err.status;
        err.message = err.message;
        next(err);
    })
}


exports.getAllUser = (req, res) => {
    const query = User.find()
    query.exec().then((data) => {
        return res.status(200).send(data);
    }).catch((err) => {
        err.status = err.status;
        err.message = err.message;
        next(err);
    })
}

exports.getUserById = (req, res) => {
    const query = User.find({ _id: req.params.id });
    query.exec().then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        err.status = err.status;
        err.message = err.message;
        next(err);
    })
}


exports.updateUser = (req, res) => {
    const query = User.updateOne({ _id: req.params.id }, req.body)
    query.exec().then((data) => {
        res.status(200).send({ data });
    }).catch((err) => {
        err.status = err.status;
        err.message = err.message;
        next(err);
    })
}

exports.deleteUserById = (req, res) => {
    const query = User.deleteOne({ _id: req.params.id })
    query.exec().then((data) => {
        res.status(200).send({ data })
    }).catch((err) => {
        err.status = err.status;
        err.message = err.message;
        next(err);
    })
}