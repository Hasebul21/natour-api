const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  guides : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'User'
    }
   ]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
