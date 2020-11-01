export enum SocketEvent {
  Connected = 'Connected',
  JoinSpace = 'JoinSpace',
  JoinedSpace = 'JoinedSpace',
  PeerJoined = 'PeerJoined',
}

export interface CreateSpaceBody {
  spaceName: string;
  hostName: string;
  hostId: string;
}

export interface Peer {
  id: string;
  name: string;
}

export interface Space {
  id: string;
  name: string;
  peers: Array<Peer>;
  host: Peer;
}

export type PeerJoinedFunction = (space: Space) => void;
