import React, { FC, useCallback, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: 'green',
  },
  tool: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  onToolModeChanged: (tool: Tools, mode: boolean) => void;
}

export type Tools = 'selection' | 'drawing';

const Toolbar: FC<Props> = ({ onToolModeChanged }) => {
  const [activeTool, setActiveTool] = useState<Tools>('selection');
  const classes = useStyles();

  const changeToolMode = useCallback(
    (nextTool: Tools) => () => {
      if (nextTool === 'selection') {
        if (activeTool !== 'selection') {
          onToolModeChanged(activeTool, false);
          onToolModeChanged('selection', true);
          setActiveTool('selection');
        }
      } else {
        onToolModeChanged(activeTool, false);
        if (nextTool === activeTool) {
          onToolModeChanged('selection', true);
          setActiveTool('selection');
        } else {
          onToolModeChanged(nextTool, true);
          setActiveTool(nextTool);
        }
      }
    },
    [activeTool, onToolModeChanged]
  );

  const getClasses = useCallback(
    (tool: Tools): string =>
      tool === activeTool ? `${classes.active} ${classes.tool}` : classes.tool,
    [activeTool]
  );

  return (
    <section>
      <IconButton
        className={getClasses('drawing')}
        aria-label="toogle-drawing"
        onClick={changeToolMode('drawing')}
      >
        <Icon>create</Icon>
      </IconButton>
      <IconButton
        className={getClasses('selection')}
        aria-label="toogle-selection"
        onClick={changeToolMode('selection')}
      >
        <Icon>open_with</Icon>
      </IconButton>
    </section>
  );
};

export default Toolbar;
