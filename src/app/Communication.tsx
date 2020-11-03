import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { useSpace } from './state/Space';
import { useHistory } from 'react-router-dom';
import { Space } from '../types/communication';

const useStyles = makeStyles({
  main: { display: 'flex', flexDirection: 'column', padding: '1em' },
});

const Communication: FC = () => {
  const styles = useStyles();
  const { space, spaces, createSpace, joinSpace } = useSpace();
  const [peerName, setPeerName] = useState('');
  const [spaceName, setSpaceName] = useState('');
  const history = useHistory();

  const handleStateChange = (setState: Dispatch<SetStateAction<string>>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(event.target.value);
  };

  const handleCreateSpace = useCallback(async () => {
    const createdSpace = await createSpace(peerName, spaceName);
    history.replace(`/${createdSpace.id}`);
  }, [peerName, spaceName]);

  const handleJoinSpace = useCallback(
    (space: Space) => () => {
      history.push(`/${space.id}`);
    },
    []
  );

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
                onClick={handleJoinSpace(space)}
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
