import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import WebSocket from 'ws';

const app = express();
const port = process.env.PORT || 5555;
const server = app.listen(port);
console.log(`Listening on ${port}`);

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const ip = req.socket.remoteAddress;
  console.log(`WebSocket: Received connection from ${ip}`);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

//Parse request body to json
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.normalize(path.join(__dirname, './dist/'))));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, './dist/index.html')));
});
