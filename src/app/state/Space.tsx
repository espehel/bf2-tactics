import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { Space } from '../../types/communication';
import { useAsyncRetry } from 'react-use';
import { getSpaces, postSpacesCreate } from '../api/rest';
import WebSocket from '../api/websocket';
import uniqid from 'uniqid';

const peerId = uniqid();

const [SpaceProvider, useSpace] = createUseContext(() => {
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [currentSpace, setSpace] = useState<Space>();
  const { value: spaces, retry: refreshSpaces } = useAsyncRetry(getSpaces);

  const joinSpace = useCallback(async (space: Space, peerName: string): Promise<
    void
  > => {
    setSpace(space);
    const ws = await WebSocket.connect(space.id);
    setWebsocket(ws);
    const updatedSpace = await ws.joinSpace({ id: peerId, name: peerName });
    setSpace(updatedSpace);

    ws.onSpaceUpdated((spaceWithNewPeer) => {
      setSpace(spaceWithNewPeer);
    });
  }, []);

  const createSpace = useCallback(
    async (spaceName: string): Promise<Space> => {
      const space = await postSpacesCreate({
        hostId: peerId,
        spaceName: spaceName,
      });
      refreshSpaces();
      return space;
    },
    [joinSpace, refreshSpaces]
  );

  return { space: currentSpace, spaces, joinSpace, createSpace };
});

export { SpaceProvider, useSpace };
