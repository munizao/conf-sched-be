const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  presenter: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isScheduled: {
    type: Boolean,
    required: true,
  },
  timeSlot: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Presentation', schema);
