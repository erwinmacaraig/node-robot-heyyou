var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
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
shopSchema.plugin(autoIncrement.plugin, {
  model: 'Shop',
  startAt: 1
});
var Shop = mongoose.model('Shop', shopSchema);

module.exports = {Shop};
