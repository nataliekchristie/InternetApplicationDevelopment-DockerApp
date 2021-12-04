const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const KafkaProducer = require('/kafka/KafkaProducer.js');
const producer = new KafkaProducer('createListing');
const port = 5555;

producer.connect(() => console.log('Kafka Connected'));
client.connect((err) => {

    const dbName = '667fp';
    const db = client.db(dbName);
    const dbAddress = 'mongodb://localhost:27017';
    const inqCollection = db.collection('listings');
    const client = new MongoClient(dbAddress);

    if(err){
        console.log('Could not connect to Mongodb');
    }

    console.log('Connected to Mongodb');

    app.post("/api/createListing", (req, res) => {
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        }
        producer.send({
            listingData
        });
        
    });

    app.listen(port, () => console.log(`Listing on port ${port}`));

});

