const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
//const KafkaProducer = require('./kafka/KafkaProducer.js');
//const producer = new KafkaProducer('myProducer');
const port = 5000;
//const redis = require('redis');
//const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const Clipper = require('image-clipper');

const storageListing = multer.diskStorage({
	destination: function(req, file, callback) {
			callback(null, path.resolve(__dirname, '../src/images'));
	}
});
const upload = multer({storage: storageListing});

//producer.connect(() => console.log('Kafka Connected'));

    const dbAddress = process.env.MONGO_HOST || 'mongodb://localhost:27017';
    const client = new MongoClient(dbAddress);

client.connect((err) => {
 if(err){
        console.log(err);
        console.log('Could not connect to Mongodb');
        process.exit(1)
    }
    const dbName = '667fp';
    const db = client.db(dbName);
    const listCollection = db.collection('listings');
    const userCollection = db.collection('users');

   

    console.log('Connected to Mongodb');

    app.post("/listingapi/createListing", upload.single('image'), (req, res) => {
       // let filename = path.parse(req.image.filename).name;
        let filename = req.image.filename;
        let filePath = req.file.path;
        /*
        let image = fs.readFileSync(req.file.path);
      
        let encodedimage = image.toString("base64");
        let imagetosubmit = {
          contentType: req.file.mimetype,
          image: Buffer.from(encodedimage, "base64"),
        };*/

        let image100 = "100-"+filename;
        let image500 = "500-"+filename;

        Clipper(filePath, function() {
            this.crop(20, 20, 100, 100)
            .resize(100, 100)
            .quality(100)
            .toFile(path.join(__dirname, '../src/images',image100), function() {
               console.log('image 100x100 saved');
           });
        });

        Clipper(filePath, function() {
            this.crop(20, 20, 100, 100)
            .resize(500, 500)
            .quality(100)
            .toFile(path.join(__dirname, '../src/images', image500), function() {
               console.log('image 500x500 saved');
           });
        });

        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            image: filename,
            image100: image100,
            image500: image500,
        };
        
        return listCollection.insertOne(listingData)
        .then(() => console.log("Listing inserted into db"))
        .catch((e) => console.log(e));
        /*
        producer.send({
            listingData
        });*/
        
    });

    app.post("/listingapi/createListing", (req, res) => {
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        }
        return listCollection.insertOne(listingData)
        .then(() => console.log("Listing inserted into db"))
        .catch((e) => console.log(e));
        /*
        producer.send({
            listingData
        });*/
        
    });


    app.get('/listingapi/getListings', (req,res) => {
        listCollection.find({}).toArray()
        .then((result) => {
          res.send(result.data);
        })
        .catch((e) => console.log(e));
      });

    app.get("/listingapi/viewListing", (req, res) => {
        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
        }
        res.send(messages);
        listCollection.find(listingData).toArray();
    });

    // temporarily putting login info here
    app.get('/listingapi/getUserInfo', (req,res) => {
        userCollection.find()
    });

   // app.listen(port, () => console.log(`Listing on port ${port}`));
   app.listen(5000);

});

