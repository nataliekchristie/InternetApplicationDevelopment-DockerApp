const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
//const KafkaProducer = require('./kafka/KafkaProducer.js');
//const producer = new KafkaProducer('createListing');
const port = 5000;
//const redis = require('redis');
//const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

//producer.connect(() => console.log('Kafka Connected'));

    const dbAddress = 'mongodb://localhost:27017';
    const client = new MongoClient(dbAddress);

client.connect((err) => {
 if(err){
        console.log('Could not connect to Mongodb');
    }
    const dbName = '667fp';
    const db = client.db(dbName);
    const listCollection = db.collection('listings');

   

    console.log('Connected to Mongodb');

    app.post("/listingapi/createListing", (req, res) => {
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        }
        listCollection.insertOne(listingData)
        .then(() => console.log("Listing inserted into db"))
        .catch((e) => console.log(e));
        /*
        producer.send({
            listingData
        });*/
        
    });

    app.get("/listingapi/viewListing", (req, res) => {
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        }
        res.send(messages);
        inquiriesCollection.find(listingData).toArray();
    });

   // app.listen(port, () => console.log(`Listing on port ${port}`));
   app.listen(5000);

});

