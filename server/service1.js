const express = require('express');
const redis = require('redis');
const axios = require('axios');

// we will make service1 the publisher and service2 the subscriber
// redis is not used for long term storage
// used for real time-like featrues such as chatting
const client = redis.createClient(); // connection to redis

const app = express();
app.use(express.text());

// Publisher
// publish when events happen
app.get('/service1/testPublish', (req, res) => {
    // channel name, message
    client.publish('services', 'Service 1 says hello');
    res.send('done!');
});

const messages = ['Chat history :']; // erased if app restarts

app.post('/service1/submit-message', (req, res) => {
    // channel name, message
    messages.push(req.body);
    client.publish('services', req.body);
    console.log(req.body);    
    res.send('Got Message : ' + req.body);
});

app.get('/service1/get-messages', (req, res) => {
    res.send(messages);
})

app.listen(4000, () => console.log('Service 1 is listening to 4000'));
