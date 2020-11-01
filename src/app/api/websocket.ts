import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {
  Peer,
  PeerJoinedFunction,
  SocketEvent,
  Space,
} from '../../types/communication';

let socket: Socket;

export const connect = (nsp: string = ''): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    socket = io(`/${nsp}`, { reconnection: false });
    socket.on('connect', () => {
      resolve('socket connected.');
    });
    socket.on('connect_error', () => {
      reject('Error connection to socket.');
    });
  });
};

export const joinSpace = (peer: Peer): Promise<Space> =>
  new Promise<Space>((resolve, reject) => {
    if (socket) {
      socket.emit(SocketEvent.JoinSpace, peer);
      socket.on(SocketEvent.JoinedSpace, (space: Space) => {
        resolve(space);
      });
    } else {
      reject('Socket not connected');
    }
  });

export const onPeerJoined = (fn: PeerJoinedFunction) => {
  if (socket) {
    socket.on(SocketEvent.PeerJoined, fn);
  } else {
    throw new Error('Socket not connected');
  }
};
