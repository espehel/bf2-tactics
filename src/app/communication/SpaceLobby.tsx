import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { Space } from '../../types/communication';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useSpace } from '../state/Space';

interface Props {
  space: Space;
}

const SpaceLobby: FC<Props> = ({ space }) => {
  const [userName, setUserName] = useState('');
  const { joinSpace } = useSpace();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleJoinSpace = useCallback(() => {
    joinSpace(space, userName);
  }, [space, userName, joinSpace]);

  return (
    <article>
      <h2>{space.name}</h2>
      <p>To join the planning space, please enter a username</p>
      <TextField
        label="Username"
        variant="filled"
        onChange={handleNameChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinSpace}
        disabled={!userName}
      >
        Join space
      </Button>
    </article>
  );
};

export default SpaceLobby;
