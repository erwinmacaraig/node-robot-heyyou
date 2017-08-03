var mongoose = require('mongoose');

var robotSchema = new mongoose.Schema({
  x: {
    type: Number,
    require: true
  },
  y: {
    type: Number,
    require: true
  },
  heading: {
    type: String,
    require: true
  },
  commands: {
    type: String,
    require: true
  }
});

var Robot = mongoose.model('Robot', robotSchema);
module.exports = {Robot};
