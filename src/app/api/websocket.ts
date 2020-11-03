import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {
  Peer,
  SpaceUpdatedFunction,
  SocketEvent,
  Space,
} from '../../types/communication';

export default class Websocket {
  socket: Socket;

  // Singleton pattern
  private static webSocket?: Websocket;
  private constructor(socket: Socket) {
    this.socket = socket;
  }
  static connect = (nsp: string = ''): Promise<Websocket> => {
    return new Promise<Websocket>((resolve, reject) => {
      if (Websocket.webSocket) {
        resolve(Websocket.webSocket);
      } else {
        const socket = io(`/${nsp}`, { reconnection: false });
        const webSocket = new Websocket(socket);
        socket.on('connect', () => {
          resolve(webSocket);
        });
        socket.on('connect_error', () => {
          reject('Error connection to socket.');
        });
      }
    });
  };

  joinSpace = (peer: Peer): Promise<Space> =>
    new Promise<Space>((resolve) => {
      this.socket.emit(SocketEvent.JoinSpace, peer);
      this.socket.on(SocketEvent.SpaceUpdated, (space: Space) => {
        resolve(space);
      });
    });

  onSpaceUpdated = (fn: SpaceUpdatedFunction) => {
    this.socket.on(SocketEvent.SpaceUpdated, fn);
  };
}
