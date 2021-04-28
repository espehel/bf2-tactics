import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { Space } from '../../types/communication';
import { useAsyncRetry } from 'react-use';
import { getSpaces, postSpacesCreate } from '../api/rest';
import WebSocket from '../api/websocket';
import uniqid from 'uniqid';

const peerId = uniqid();

const [SpaceProvider, useSpace] = createUseContext(() => {
  const { value: spaces, retry: refreshSpaces } = useAsyncRetry(getSpaces);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [currentSpace, setSpace] = useState<Space>();
  const [canvasJson, setCanvasJson] = useState<string>();

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
    ws.onCanvasUpdated((updatedCanvasJson) => {
      setCanvasJson(updatedCanvasJson);
    });
  }, []);

  const createSpace = useCallback(
    async (spaceName: string, map: string): Promise<Space> => {
      const space = await postSpacesCreate({
        hostId: peerId,
        spaceName: spaceName,
        map,
      });
      refreshSpaces();
      return space;
    },
    [joinSpace, refreshSpaces]
  );

  const changeMap = useCallback(
    (map: string) => {
      websocket?.changeMap(map);
    },
    [websocket]
  );

  const updateCanvas = useCallback(
    (canvasJson: string) => {
      console.log({ canvasJson });
      websocket?.updateCanvas(canvasJson);
    },
    [websocket]
  );

  return {
    space: currentSpace,
    canvasJson,
    spaces,
    joinSpace,
    createSpace,
    changeMap,
    updateCanvas,
  };
});

export { SpaceProvider, useSpace };
