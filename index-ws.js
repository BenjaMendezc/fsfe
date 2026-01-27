const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);

server.listen(3000, function () { console.log('Listening on 3000'); });

/** Begin websocket **/

const websocketServer = require('ws').Server;

const wss = new websocketServer({ server: server });

wss.on('connection', function connection(wsc) {
  const numClients = wss.clients.size;
  console.log('Clients connected:', numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (wsc.readyState === wsc.OPEN) {
    wsc.send('Welcome to my server!');
  }

  wsc.on('close', function close() {
    console.log('A client has desconected.');
    wss.broadcast(`Current visitors: ${numClients}`);
  });


})

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => client.send(data));
}