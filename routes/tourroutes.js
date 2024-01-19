const express = require("express");
const router = express.Router();
const {createTour, getAllTour, getTourById } = require("../controller/tourController");

router.route('/')
       .get(getAllTour)
       .post(createTour)

router.route('/:id')
      .get(getTourById)

module.exports = router;