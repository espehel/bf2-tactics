import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { Space } from '../../types/communication';
import { useAsync } from 'react-use';
import { getSpaces, postSpacesCreate } from '../api/rest';
import { useParams } from 'react-router-dom';
import { AppParams } from '../../types/router';
import WebSocket from '../api/websocket';
import uniqid from 'uniqid';

const peerId = uniqid();

const [SpaceProvider, useSpace] = createUseContext(() => {
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [space, setSpace] = useState<Space>();
  const { value: spaces } = useAsync(getSpaces);
  const { spaceId } = useParams<AppParams>();

  const joinSpace = useCallback(async (space: Space, peerName: string): Promise<
    void
  > => {
    console.log({ space });
    setSpace(space);
    const ws = await WebSocket.connect(space.id);
    setWebsocket(ws);
    const updatedSpace = await ws.joinSpace({ id: peerId, name: peerName });
    console.log({ updatedSpace });
    setSpace(updatedSpace);

    ws.onSpaceUpdated((spaceWithNewPeer) => {
      setSpace(spaceWithNewPeer);
      console.log({ spaceWithNewPeer });
    });
  }, []);

  const createSpace = useCallback(
    async (peerName: string, spaceName: string): Promise<void> => {
      const space = await postSpacesCreate({
        hostName: peerName,
        hostId: peerId,
        spaceName: spaceName,
      });
      joinSpace(space, peerName);
    },
    [joinSpace]
  );

  return { space, spaces, joinSpace, createSpace };
});

export { SpaceProvider, useSpace };
