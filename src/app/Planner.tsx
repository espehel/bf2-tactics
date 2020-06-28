import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Canvas from './drawing/Canvas';

const useStyles = makeStyles({
  map: {
    width: '100%',
    height: 'auto',
    maxWidth: '1024px',
    maxHeight: '1024px',
  },
});

interface Props {
  map: string;
}

const Planner: FC<Props> = ({ map }) => {
  const styles = useStyles();
  return (
    <article>
      <Canvas />
      <img
        className={styles.map}
        src={`maps/${map}/gpm_cq_16_menuMap.png`}
        alt={`Map of ${map}`}
      ></img>
    </article>
  );
};

export default Planner;
