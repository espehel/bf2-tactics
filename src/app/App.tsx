import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Planner from './Planner';
import Header from './Header';
import MapList from './MapList';
import { mapNames } from './mapAssets';
import Communication from './Communication';
import { MainStateProvider } from './state/MainState';

const useStyles = makeStyles({
  app: { height: '100%' },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1024px 1fr',
  },
});

const App: FC = () => {
  const styles = useStyles();
  return (
    <article className={styles.app}>
      <Header />
      <MainStateProvider>
        <main className={styles.main}>
          <MapList maps={mapNames} />
          <Planner />
          <Communication />
        </main>
      </MainStateProvider>
    </article>
  );
};

export default App;
