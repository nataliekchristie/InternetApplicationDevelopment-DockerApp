const WebSocket = require('ws');
const redis = require('redis');
const express = require('express');
// const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' }); // Connection to redis
const client = redis.createClient();

const app = express();
app.use(express.json());

const wss = new WebSocket.Server({ port: 5000 });


wss.on('connection', (ws) => {
  // ws represents a connection to a browser
  // stays active entire time browser is open
  console.log('Someone has connected');
  // ws have events instead of endpoints

  ws.on('message', (message) => {
    // when client sends message to server
    // ws['accountId'] = JSON.parse(message)['accountId']
    // ws['username'] = JSON.parse(message)['username']
  });

  ws.on('close', (message) => {
    // when client leaves the page
    console.log('client has disconnected');
  })
});

// Subscriber
// Listen for incoming messages
// Redis client
client.on('message', (channel, message) => { // all channels for now
  // this code runs when message is read
  // console.log(`subscriber hears message ${message}`);
  console.log('Got message : ' + message);
  // broadcast
  wss.clients.forEach(wsClients => wsClients.send(message));  
});

// client.subscribe('testPublish');

// A helper function that broadcasts the message to all the clients
// const broadcast = (message) => {
//   wss.clients.forEach(client => client.send(message));
// };

// client.on('message', (channel, message) => {
//   console.log('Got message: ' + message);
  
//   // switch (JSON.parse(message)['type']) {
//   //   case '/listingapi/createListing':
//   //   // case '/listingapi/delete':
//   //   // case '/listingapi/edit':
//   //     console.log(`${JSON.parse(message)['type']}`, message);
//   //     broadcast(message);
//   //     break;
//   //   case '/createInquiry/create':
//   //   // case '/CreateInquiry/reply':
//   //     console.log(`${JSON.parse(message)['type']}`, message);
//   //     wss.clients.forEach((ws) => {
//   //       if (ws['accountId'] == JSON.parse(message)['accountIdOwner'] || 
//   //           ws['accountId'] == JSON.parse(message) ['accountIdInterested']) {
//   //             ws.send(message);
//   //           }
//   //     });
//   //     break;
//   //     default:
//   //       console.log('An unknown: ', channel);
//   //       break;
//   // }
// });

client.subscribe("services"); // Start listening to messages

console.log('Websocket server listing on port 5000');
// console.log('Check');