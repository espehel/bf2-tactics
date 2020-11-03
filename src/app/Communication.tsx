import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createSpace, getSpaces } from './api/rest';
import { connect, joinSpace, onSpaceUpdated } from './api/websocket';
import { Space } from '../types/communication';
import { useAsync } from 'react-use';
import { TextField } from '@material-ui/core';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  main: { display: 'flex', flexDirection: 'column', padding: '1em' },
});

const peerId = uniqid();

const Communication: FC = () => {
  const styles = useStyles();

  const [peerName, setPeerName] = useState('');
  const [spaceName, setSpaceName] = useState('');
  const [space, setSpace] = useState<Space>();
  const { value: spaces } = useAsync(getSpaces);

  const handleStateChange = (setState: Dispatch<SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(event.target.value);
  };

  const handleJoinSpace = useCallback(
    async (space: Space) => {
      console.log({ space });
      setSpace(space);
      const con = await connect(space.id);
      console.log(con);
      const updatedSpace = await joinSpace({ id: peerId, name: peerName });
      console.log({ updatedSpace });
      setSpace(updatedSpace);

      onSpaceUpdated((spaceWithNewPeer) => {
        setSpace(spaceWithNewPeer);
        console.log({ spaceWithNewPeer });
      });
    },
    [peerName]
  );

  const handleCreateSpace = useCallback(async () => {
    const space = await createSpace({
      hostName: peerName,
      hostId: peerId,
      spaceName: spaceName,
    });
    handleJoinSpace(space);
  }, [peerName, spaceName, handleJoinSpace]);

  return (
    <article className={styles.main}>
      <TextField
        label="Name"
        variant="filled"
        onChange={handleStateChange(setPeerName)}
      />
      {!space && (
        <>
          <section>
            <TextField
              label="Room name"
              variant="filled"
              onChange={handleStateChange(setSpaceName)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateSpace}
            >
              Create room
            </Button>
          </section>
          {spaces &&
            spaces.map((space) => (
              <Button
                key={space.id}
                variant="outlined"
                onClick={() => handleJoinSpace(space)}
              >
                {space.name}
              </Button>
            ))}
        </>
      )}
      {space && (
        <>
          <h2>{space.name}</h2>
          {space.peers.map((peer) => (
            <p key={peer.id}>{peer.name}</p>
          ))}
        </>
      )}
    </article>
  );
};

export default Communication;
