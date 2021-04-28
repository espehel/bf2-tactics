export enum SocketEvent {
  Connected = 'Connected',
  JoinSpace = 'JoinSpace',
  SpaceUpdated = 'SpaceUpdated',
  ChangeMap = 'ChangeMap',
  UpdateCanvas = 'UpdateCanvas',
  CanvasUpdated = 'CanvasUpdated',
}

export interface CreateSpaceBody {
  spaceName: string;
  hostId: string;
  map: string;
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
  map: string;
}

export type SpaceUpdatedFunction = (space: Space) => void;
export type CanvasUpdatedFunction = (canvasJson: string) => void;
