const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const redis = require('redis');

const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
//const mongoose  = require('mongoose');
//const {Schema} = mongoose;

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

//const Schema = mongoose.Schema;

/*
let list = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  price: {
    type: Number
  }
});*/

//let List = mongoose.model("list", list);
//module.exports = List;

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db('test101');
  // move app logic in here
  const app = express();
  app.use(bodyParser.json());
  // sorry for spelling wrong :(
  app.post('/messanger/postMessage', (req, res) => {
    console.log(req.body);
    db.collection('test').insertOne({ data: req.body.message })
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));
    client.publish('testPublish', req.body.message);
    res.send('ok');
  });

  app.get('/messanger/getMessages', (req, res) => {
    db.collection('test').find({}).toArray()
      .then((result) => {
        res.send(result.map(r => r.data));
      })
      .catch((e) => console.log(e));
  });

  app.get('/api/getListings', (req,res) => {
    db.collection('listings').find({}).toArray()
    .then((res) => {
      res.send(res.data);
    })
    .catch((e) => console.log(e));
  });

  app.post('/api/makeListing', (req,res) => {
    var listingData = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
    }
  })
/*
  app.send('/api/makeListing', (req,res) => {
    db.collection('test').insertOne({})
  })*/


  app.listen(5000);
  // end app logic
});
