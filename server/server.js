
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Robot} = require('./models/robot');
var {Shop} = require('./models/shop');

var shop = new Shop({
  width: 10,
  height: 10
});
shop.save().then((doc) => {
  console.log(doc);
},
  (e) => {
    console.log(e);
  }
);

/*
var app = express();
var port = 3000;
app.use(bodyParser.json());




app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
*/
