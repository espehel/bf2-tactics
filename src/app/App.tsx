import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Planner from './Planner';
import Header from './Header';
import MapList from './MapList';
import { mapNames } from './mapAssets';
import Communication from './Communication';

const useStyles = makeStyles({
  app: { height: '100%' },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1024px 1fr',
  },
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
        <Communication />
      </main>
    </article>
  );
};

export default App;
