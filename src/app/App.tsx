import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Planner from './Planner';
import Header from './Header';

const useStyles = makeStyles({
  app: { height: '100%' },
  main: {
    display: 'grid',
    gridTemplateColumns: '10em auto 10em',
    gridTemplateRows: '1fr',
    justifyContent: 'center',
  },
  communication: {},
  maps: {},
});

const App: FC = () => {
  const styles = useStyles();
  return (
    <article className={styles.app}>
      <main className={styles.main}>
        <article className={styles.communication}></article>
        <Planner map="Dalian_plant" />
        <article className={styles.maps}></article>
      </main>
    </article>
  );
};

export default App;
