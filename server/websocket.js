const WebSocket = require('ws');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server({ port: 6000 });

wss.on('connection', (ws) => {
  // ws represents a connection to a browser
  // stays active entire time browser is open
  console.log('Someone has connected');
  // ws have events instead of endpoints

  ws.on('message', (message) => {
    // when client sends message to server
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
  console.log(`subscriber hears message ${message}`);
  // broadcast
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

client.subscribe('testPublish');