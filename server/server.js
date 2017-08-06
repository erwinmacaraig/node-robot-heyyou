
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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

//FETCH shop by its id
app.get('/shop/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send(
      {
        message: 'Invalid id ' + id
      }
    );
  }
  Shop.findById(id).then((shop) => {
    if(!shop){
      return res.status(404).send({
        message: 'No shop with id ' + id
      });
    }
    res.send({
      id: shop._id,
      width: shop.width,
      height: shop.height,
      robots: shop.robot
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
