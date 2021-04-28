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
  const { hostId, map, spaceName }: CreateSpaceBody = request.body;
  const spaceId = uniqid();
  const space: Space = {
    id: spaceId,
    hostId,
    name: spaceName,
    peers: [],
    map,
  };
  spaces.set(spaceId, space);
  let canvasJson = '';

  const nsp = io.of(`/${spaceId}`);
  nsp.on('connection', function (socket) {
    let socketPeer: Peer;
    console.log(
      `NSP CONNECT: Socket with id=${socket.id} connected to namespace ${space.id}`
    );
    socket.emit(SocketEvent.Connected);
    socket.on(SocketEvent.JoinSpace, (peer: Peer) => {
      console.log(
        `JoinedSpace: Socket with id=${socket.id} joined space ${space.id}`
      );
      socketPeer = peer;
      space.peers.push(peer);
      socket.emit(SocketEvent.SpaceUpdated, space);
      nsp.emit(SocketEvent.SpaceUpdated, space);
    });
    socket.on(SocketEvent.ChangeMap, (map: string) => {
      space.map = map;
      nsp.emit(SocketEvent.SpaceUpdated, space);
    });
    socket.on(SocketEvent.UpdateCanvas, (updatedCanvasJson: string) => {
      if (canvasJson !== updatedCanvasJson) {
        canvasJson = updatedCanvasJson;
        nsp.emit(SocketEvent.CanvasUpdated, updatedCanvasJson);
      }
    });
    socket.on('disconnect', () => {
      console.log(
        `NSP DISCONNECT Socket with id=${socket.id} disconnected from namespace ${space.id}`
      );
      space.peers = space.peers.filter((peer) => peer.id !== socketPeer.id);
      nsp.emit(SocketEvent.SpaceUpdated, space);
    });
  });

  console.log(`Space ${spaceId} created by ${hostId}.`);
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
