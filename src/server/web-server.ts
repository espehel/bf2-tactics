import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import SocketIO from 'socket.io';
import {
  CreateSpaceBody,
  Peer,
  SocketEvent,
  Space,
} from '../types/communication';
import uniqid from 'uniqid';

const app = express();

//Parse request body to json
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.normalize(path.join(__dirname, '../dist/'))));

const port = process.env.PORT || 5555;
const server = app.listen(port);
console.log(`Listening on ${port}`);

const io = SocketIO(server);

const spaces = new Map<string, Space>();

app.post('/spaces/create', (request, response) => {
  const { spaceName, hostId, hostName }: CreateSpaceBody = request.body;
  const spaceId = uniqid();
  const space: Space = {
    id: spaceId,
    host: { id: hostId, name: hostName },
    name: spaceName,
    peers: [],
  };
  spaces.set(spaceId, space);

  const nsp = io.of(`/${spaceId}`);
  nsp.on('connection', function (socket) {
    console.log(
      `NSP CONNECT: Socket with id=${socket.id} connected to namespace ${space.id}`
    );
    socket.emit(SocketEvent.Connected);
    socket.on(SocketEvent.JoinSpace, (peer: Peer) => {
      console.log(
        `JoinedSpace: Socket with id=${socket.id} joined space ${space.id}`
      );
      space.peers.push(peer);
      socket.emit(SocketEvent.JoinedSpace, space);
      nsp.emit(SocketEvent.PeerJoined, space);
    });
  });

  console.log(`Space ${spaceId} created by ${hostName}(${hostId}).`);
  response.status(201).send(space);
});

app.get('/spaces', (request, response) => {
  response.status(200).send([...spaces.values()]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, '../dist/index.html')));
});
