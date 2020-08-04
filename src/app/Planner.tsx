import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawingBoard from './drawing/DrawingBoard';
import Toolbar from './drawing/Toolbar';
import { CanvasProvider } from './state/Canvas';
import { ToolsProvider } from './state/Tools';

const useStyles = makeStyles({
  main: {
    width: '100%',
    height: 'auto',
    maxWidth: '1024px',
    maxHeight: '1024px',
    position: 'relative',
  },
  map: { position: 'absolute', 'z-index': '-1', top: '0', left: '0' },
});

interface Props {
  map: string;
}

const Planner: FC<Props> = ({ map }) => {
  const styles = useStyles();
  return (
    <CanvasProvider>
      <ToolsProvider>
        <article className={styles.main}>
          <Toolbar />
          <DrawingBoard />
          <img
            className={styles.map}
            src={`maps/${map}/gpm_cq_16_menuMap.png`}
            alt={`Map of ${map}`}
          ></img>
        </article>
      </ToolsProvider>
    </CanvasProvider>
  );
};

export default Planner;
