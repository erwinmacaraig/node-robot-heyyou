
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Robot} = require('./models/robot');
var {Shop} = require('./models/shop');

var app = express();
var port = 3000;
app.use(bodyParser.json());

app.post('/shop', (req, res) => {
  console.log(req.body);
  var shop = new Shop({
    width: req.body.width,
    height: req.body.height
  });
  shop.save().then((doc) => {
    res.send({
      id: doc._id,
      width: doc.width,
      height: doc.height
    });
  },
    (e) => {    
      res.status(400).send(e);
    }
  );
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
