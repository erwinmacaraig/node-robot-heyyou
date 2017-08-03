var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
  width:{
    type: Number,
    require: true
  },
  height: {
    type: Number,
    require: true
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
