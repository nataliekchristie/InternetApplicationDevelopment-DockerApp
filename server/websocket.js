const WebSocket = require('ws');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' }); // Connection to redis

const wss = new WebSocket.Server({ port: 6000 });

/*
wss.on('connection', (ws) => {
  console.log('Someone has connected');
});

client.on('message', (channel, message) => { // all channels for now
  console.log(`subscriber hears message ${message}`);
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

client.subscribe('testPublish');
*/


wss.on('connection', (ws) => {
  console.log('Someone has connected!');
  ws.on('message', (message) => {
    ws['accountId'] = JSON.parse(message)['accountId']
    ws['username'] = JSON.parse(message)['username']
  })
});

// A helper function that broadcasts the message to all the clients
const broadcast = (message) => {
  wss.clients.forEach(client => client.send(message));
};

client.on('message', (channel, message) => {
  console.log('Got message: ' + message);
  
  // switch (JSON.parse(message)['type']) {
  //   case '/listingapi/createListing':
  //   // case '/listingapi/delete':
  //   // case '/listingapi/edit':
  //     console.log(`${JSON.parse(message)['type']}`, message);
  //     broadcast(message);
  //     break;
  //   case '/createInquiry/create':
  //   // case '/CreateInquiry/reply':
  //     console.log(`${JSON.parse(message)['type']}`, message);
  //     wss.clients.forEach((ws) => {
  //       if (ws['accountId'] == JSON.parse(message)['accountIdOwner'] || 
  //           ws['accountId'] == JSON.parse(message) ['accountIdInterested']) {
  //             ws.send(message);
  //           }
  //     });
  //     break;
  //     default:
  //       console.log('An unknown: ', channel);
  //       break;
  // }
});

client.subscribe("services"); // Start listening to messages

console.log('Websocket server listing on port 6000');
// console.log('Check');