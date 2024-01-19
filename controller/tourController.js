const Tour = require("../model/tourmodel")

exports.createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body)
        res.status(200).json(tour);
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.getAllTour = async (req, res) => {
    try {
        const alltour = await Tour.find().populate({
            path: "guides",
            select: "-__v-age"
        })
        res.status(200).json(alltour);
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.getTourById = async (req, res) => {
    try {
       const tour = await Tour.findById(req.params.id);
       res.status(200).json(tour)
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}