var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
  width:{
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  robot: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Robot'
    }
  ]
});

var Shop = mongoose.model('Shop', shopSchema);

module.exports = {Shop};
