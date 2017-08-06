
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Robot} = require('./models/robot');
var {Shop} = require('./models/shop');

var app = express();
var port = 3000;
app.use(bodyParser.json());

app.post('/shop', (req, res) => {
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
  var bots = [];

  Shop.findById(id).then((shop) => {
    if(!shop){
      return res.status(404).send({
        message: 'No shop with id ' + id
      });
    }
    if(shop.robot.length > 0){
      Robot.find({
        '_id': { $in: shop.robot}
      },{ __v: 0}).then((docs) => {
        res.send({
         id: shop._id,
         width: shop.width,
         height: shop.height,
         robots: docs
       });
      });
    }
    else {
      res.send({
       id: shop._id,
       width: shop.width,
       height: shop.height,
       robots: bots
     });
    }


  }).catch((e) => {
    res.status(400).send(
      {
        message: 'Invalid Request'
      }
    );
  });
});

//DELETE SHOP BY ID
app.delete('/shop/:id', (req, res) => {
  var id = req.params.id;

  Shop.findByIdAndRemove(id).then((shop) => {
    if(!shop){
      return res.status(404).send({
        message: 'No shop with id ' + id
      });
    }
    res.send({
      status: 'ok'
    });
  }).catch((e) => {
    res.status(400).send({
      message: 'Invalid Request'
    });
  });
});

//CREATE NEW ROBOT
app.post('/shop/:id/robot', (req, res) => {
  var id = req.params.id;
  var bots = [];
  Shop.findById(id).then((shop) => {
    if(!shop){
      return res.status(400).send({
        message: 'No shop with id ' + id
      });
    }
   bots = shop.robot.slice();
    var robot = new Robot({
      x: req.body.x,
      y: req.body.y,
      heading: req.body.heading,
      commands: req.body.commands
    });
    robot.save().then((doc) => {
      //update shop
      bots.push(doc._id);
      Shop.findByIdAndUpdate(id,
        {
          $set: {
            robot: bots
          }
        },
        {
          returnOriginal: false
        }
      ).then((result) => {
          res.send({
            x: doc.x,
            y: doc.y,
            heading: doc.heading,
            commands: doc.commands

          });
      });

    }, (e) => {
      res.status(400).send(e);
    });
  }).catch((e) => {
    return res.status(404).send({
      message: 'Invlid Request'
    });
  });
});

//UPDATE ROBOT
app.put('/shop/:id/robot/:rid', (req, res) => {
  var id = req.params.id;
  var rid = req.params.rid;
  var body = _.pick(req.body, ['x', 'y', 'heading', 'commands']);

  Shop.find({'_id':id, 'robot': {"$all": [rid]}}).then((shop) => {
    if(shop.length == 0){
      return res.status(400).send({
        message: 'Cannot find robot in shop'
      });
    }
    Robot.findByIdAndUpdate(rid,
      {
        $set: body
      },
    {
      new: true
    }).then((doc) => {
      if(!doc){
        return res.status(404).send({
          message: 'Robot not found'
        });
      }
      res.send(doc);
    }).catch((e) => {
      res.status(400).send({
        message: 'Cannot update robot'
      });
    });
    //res.send(shop);

  }); //end finding shop


});
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
