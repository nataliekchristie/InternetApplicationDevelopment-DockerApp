const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const port = 4444;

const dbName = '';
const db = client.db(dbName);
const dbAddress = '';
const client = new MongoClient(dbAddress);

client.connect((err) => {
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
    });

    app.listen(port, () => console.log(`Listing on port ${port}`));

});

