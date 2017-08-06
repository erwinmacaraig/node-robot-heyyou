var mongoose = require('mongoose');

var robotSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true
  },
  heading: {
    type: String,
    required: true,
    maxlength: 1
  },
  commands: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

var Robot = mongoose.model('Robot', robotSchema);
module.exports = {Robot};
