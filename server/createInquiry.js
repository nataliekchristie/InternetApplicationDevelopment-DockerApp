const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const KafkaProducer = require('/kafka/KafkaProducer.js');
const producer = new KafkaProducer('createListing');
const port = 4444;
const redis = require('redis');
const redisClient = redis.createClient({host:'redis'});




client.connect((err) => {
    const dbName = '667fp';
    const db = client.db(dbName);
    const dbAddress = 'mongodb://localhost:27017';
    const inqCollection = db.collection('inquiries');
    const client = new MongoClient(dbAddress);

    if(err){
        console.log('Could not connect to Mongodb');
    }
    console.log('Connected to Mongodb');

    app.post("/api/createListing", (req, res) => {
        const inquiryData = {
            username: res.username,
            id: res.id,
            messages: [
                {
                    inquirer: req.username,
                    message: req.body.message
                }
            ],
        }
        inquiriesCollection.insertOne(inquiryData);
    });

    app.get("/api/viewInquiry", (req, res) => {
        const inquiryData = {
            username: req.username,
            id: req.id,
            messages: [
                {
                    inquirer: req.username,
                    message: req.body.message
                }
            ],
        }
        res.send(messages);
        inquiriesCollection.find(inquiryData).toArray();
    });

    

    app.listen(port, () => console.log(`Listing on port ${port}`));

});

