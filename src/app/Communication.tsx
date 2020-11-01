import React, { FC, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createSpace } from './api/rest';
import { connect, joinSpace, onPeerJoined } from './api/websocket';
import { Space } from '../types/communication';

const useStyles = makeStyles({
  main: { padding: '1em' },
});

const Communication: FC = () => {
  const styles = useStyles();

  const [space, setSpace] = useState<Space>();

  const onCreateSpace = useCallback(async () => {
    const space = await createSpace({
      hostName: 'host',
      hostId: '123',
      spaceName: 'mySpace',
    });
    console.log({ space });
    setSpace(space);
    const con = await connect(space.id);
    console.log(con);
    const updatedSpace = await joinSpace({ id: '123', name: 'host' });
    console.log({ updatedSpace });
    setSpace(updatedSpace);

    onPeerJoined((spaceWithNewPeer) => {
      setSpace(spaceWithNewPeer);
      console.log({ spaceWithNewPeer });
    });
  }, []);

  return (
    <article className={styles.main}>
      {!space && (
        <Button variant="contained" color="primary" onClick={onCreateSpace}>
          Create room
        </Button>
      )}
      {space && (
        <>
          <h2>{space.name}</h2>
          {space.peers.map((peer) => (
            <p>{peer.name}</p>
          ))}
        </>
      )}
    </article>
  );
};

export default Communication;
