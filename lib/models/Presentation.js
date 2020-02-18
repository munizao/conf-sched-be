const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  presenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Presenter',
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
    type: Number
  }
});

module.exports = mongoose.model('Presentation', schema);
