const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
});

schema.virtual('presentations', {
  ref: 'Presentation',
  localField: '_id',
  foreignField: 'presenter'
});

module.exports = mongoose.model('Presenter', schema);
