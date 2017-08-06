var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
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
robotSchema.plugin(autoIncrement.plugin, {
  model: 'Robot',
  startAt: 1
});

var Robot = mongoose.model('Robot', robotSchema);
module.exports = {Robot};
