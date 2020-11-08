export enum SocketEvent {
  Connected = 'Connected',
  JoinSpace = 'JoinSpace',
  SpaceUpdated = 'SpaceUpdated',
}

export interface CreateSpaceBody {
  spaceName: string;
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
  hostId: string;
}

export type SpaceUpdatedFunction = (space: Space) => void;
