const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const KafkaProducer = require('./kafka/KafkaProducer.js');
const producer = new KafkaProducer('myProducer');
const port = 5000;
//const redis = require('redis');
//const redisClient = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const Clipper = require('image-clipper');
const cors = require('cors');
const canvas = require('canvas');

Clipper.configure('canvas', canvas);


const storageListing = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname,'server/images'));
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  


const upload = multer({storage: storageListing});

app.use(cors());

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

    
    app.post("/listingapi/createListing", upload.single("file"), async (req, res) => {

        console.log("Reached createListing api");

        const filename = path.parse(req.file.path).base;

        producer.connect(() => {
            console.log("Kafka connected");
            producer.send(
                "Processing image: "+filename
            );
        });
       
        console.log(req.file)
     

        console.log(filename);

        console.log("before image declaration name");
        let image100 = '100x100'+filename;
        let image500 = '500x500'+filename;

        let image100_path = '../main/server/images/'+image100;
        let image500_path = '../main/server/images/'+image500;

        console.log(image100);
        console.log(image500);

        console.log("before clipper");
        Clipper(req.file.path, function() {
            console.log("clipper 1");
            this.crop(20, 20, 800, 800)
            .resize(100, 100)
            .quality(100)
            .toFile(path.join(__dirname, 'server/images',image100), function() {
               console.log('image 100x100 saved');
           });
        });

        Clipper(req.file.path, function() {
            console.log("clipper 2");
            this.crop(300, 300, 800, 800)
            .resize(500, 500)
            .quality(100)
            .toFile(path.join(__dirname, 'server/images', image500), function() {
               console.log('image 500x500 saved');
           });
        });

        console.log("before listingData declaration");

        const listingData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            image: req.file.path,
            image100: image100_path,
            image500: image500_path,
        };

        console.log("before listingCollection insertion");
        listCollection.insertOne(listingData)
        .then(() => console.log("Listing inserted into db"))
        .catch((e) => {
            console.log(e)
            console.log("error in createListing");
        });
        /*
        producer.send({
            listingData
        });*/
        
     });


    app.get('/listingapi/getListings', (req,res) => {
        listCollection.find({}).toArray()
        .then((result) => {
          res.send(result);
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
        listCollection.findOne(listingData).then(result => {
          res.send({data: result});
        })
    });

    app.get("/listingapi/deleteListing", (req,res) => {
        listCollection.deleteOne({title:req.body.title})
        .then((response) => console.log("listing removed"))
        .catch(err => console.log(err));
    })

    // temporarily putting login info here
    app.get('/listingapi/getUserInfo', (req,res) => {
        userCollection.find({username: req.body.username})
        .then((response) => {
            console.log("User info found");
            res.send(response);
        })
        .catch((err) => {
            console.log("Error in getUserInfo");
            console.log(err);
        })
    });

    app.get('/listingapi/getImage100/:title', (req,res) => {
        listCollection.findOne({title: req.params.title})
        .then((response) => {
            const data = fs.readFileSync(response.image100);
            res.send(data);
        })
        .catch(err => {console.error(err), res.status(500)});
    });

    app.get('/listingapi/getImage500/:title', (req,res) => {
        listCollection.findOne({title: req.params.title})
        .then((response) => {
            const data = fs.readFileSync(response.image500);
            res.send(data);
        })
        .catch(err => {console.error(err), res.status(500)});
    });

   // app.listen(port, () => console.log(`Listing on port ${port}`));
   app.listen(5000);

});

