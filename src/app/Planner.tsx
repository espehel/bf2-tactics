import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DrawingBoard from './drawing/DrawingBoard';
import Toolbar from './drawing/Toolbar';
import { CanvasProvider } from './state/Canvas';
import { ToolsProvider } from './state/Tools';

const useStyles = makeStyles({
  planner: { backgroundColor: 'powderblue' },
});

interface Props {
  map: string;
}

const Planner: FC<Props> = ({ map }) => {
  const styles = useStyles();
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
