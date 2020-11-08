import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSpace } from './state/Space';
import { useParams } from 'react-router-dom';
import { Space } from '../types/communication';
import SpaceLobby from './communication/SpaceLobby';
import { AppParams } from '../types/router';
import SpaceBrowser from './communication/SpaceBrowser';

const useStyles = makeStyles({
  main: { display: 'flex', flexDirection: 'column', padding: '1em' },
});

const Communication: FC = () => {
  const styles = useStyles();
  const { spaceId } = useParams<AppParams>();
  const { space: currentSpace, spaces } = useSpace();
  const [spaceToJoin, setSpaceToJoin] = useState<Space>();

  useEffect(() => {
    const urlIsCurrentSpace = currentSpace && currentSpace.id === spaceId;
    if (spaces && spaceId && !urlIsCurrentSpace) {
      const spaceFromUrl = spaces.find((space) => space.id === spaceId);
      if (spaceFromUrl) {
        setSpaceToJoin(spaceFromUrl);
      }
    }
  }, [spaceId, spaces, currentSpace]);

  return (
    <article className={styles.main}>
      {!currentSpace && !spaceToJoin && <SpaceBrowser />}
      {spaceToJoin && !currentSpace && <SpaceLobby space={spaceToJoin} />}
      {currentSpace && (
        <>
          <h2>{currentSpace.name}</h2>
          {currentSpace.peers.map((peer) => (
            <p key={peer.id}>{peer.name}</p>
          ))}
        </>
      )}
    </article>
  );
};

export default Communication;
