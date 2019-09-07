const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');
const db = 'mongodb://tanzeel_123:mydbpass@cluster0-shard-00-00-znt38.mongodb.net:27017,cluster0-shard-00-01-znt38.mongodb.net:27017,cluster0-shard-00-02-znt38.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
const jwt = require('jsonwebtoken');

mongoose.connect(db, { useNewUrlParser: true }, err => {
  if(err) {
    console.log('Error: '+err);
  }
  else {
    console.log('Successfully connected to mongodb');
  }
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (error, user) => {
    if(error) {
      console.log(error)
    }
    else {
      if(!user) {
        res.status(401).send('Invalid email')
      }
      else if(user.password !== userData.password) {
        res.status(401).send('Invalid password')
      }
      else {
        let payLoad = { subject: user._id };
        let token = jwt.sign(payLoad, 'secretKey');
        res.status(200).send({token});
      }
    }
  })
})

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if(error) {
      console.log(error);
    }
    else {
      let payLoad = { subject: registeredUser._id };
      let token = jwt.sign(payLoad, 'secretKey');
      res.status(200).send({token});
    }
  })
})

router.get('/articles', function(req, res){
    console.log('Get request for all videos');
    Event.find({})
    .exec(function(err, event){
        if (err){
            console.log("Error retrieving videos");
        }else {
            res.json(event);
        }
    });
});

module.exports = router;
