import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DrawingBoard from './drawing/DrawingBoard';
import Toolbar from './drawing/Toolbar';
import { CanvasProvider } from './state/Canvas';
import { ToolsProvider } from './state/Tools';
import { useMainState } from './state/MainState';

const useStyles = makeStyles({
  planner: { backgroundColor: 'powderblue' },
});

const Planner: FC = () => {
  const styles = useStyles();
  const { map } = useMainState();
  return (
    <CanvasProvider>
      <ToolsProvider>
        <Paper square>
          <article className={styles.planner}>
            <Toolbar />
            <DrawingBoard backgroundSrc={`maps/${map}/gpm_cq_16_menuMap.png`} />
          </article>
        </Paper>
      </ToolsProvider>
    </CanvasProvider>
  );
};

export default Planner;
