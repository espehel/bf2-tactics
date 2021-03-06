import React, { FC, useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Space } from '../../types/communication';
import { useHistory } from 'react-router-dom';
import { useSpace } from '../state/Space';
import { useMainState } from '../state/MainState';

const SpaceBrowser: FC = () => {
  const history = useHistory();
  const { spaces, createSpace } = useSpace();
  const { map } = useMainState();
  const [spaceName, setSpaceName] = useState('');

  const handleCreateSpace = useCallback(async () => {
    const createdSpace = await createSpace(spaceName, map);
    history.replace(`/${createdSpace.id}`);
  }, [spaceName]);

  const handleGoToSpace = useCallback(
    (space: Space) => () => {
      history.push(`/${space.id}`);
    },
    []
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(event.target.value);
  };

  return (
    <section>
      <section>
        <TextField
          label="Space name"
          variant="filled"
          onChange={handleNameChange}
        />
        <Button variant="contained" color="primary" onClick={handleCreateSpace}>
          Create space
        </Button>
      </section>
      {spaces &&
        spaces.map((space) => (
          <Button
            key={space.id}
            variant="outlined"
            onClick={handleGoToSpace(space)}
          >
            {space.name}
          </Button>
        ))}
    </section>
  );
};

export default SpaceBrowser;
