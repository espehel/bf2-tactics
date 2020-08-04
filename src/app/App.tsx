import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Planner from './Planner';
import Header from './Header';
import MapList from './MapList';
import { mapNames } from './mapAssets';

const useStyles = makeStyles({
  app: { height: '100%' },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  communication: {},
});

const App: FC = () => {
  const styles = useStyles();
  const [map, setMap] = useState('Dalian_plant');
  return (
    <article className={styles.app}>
      <Header />
      <main className={styles.main}>
        <MapList maps={mapNames} onMapClick={setMap} />
        <Planner map={map} />
        <article className={styles.communication}></article>
      </main>
    </article>
  );
};

export default App;
