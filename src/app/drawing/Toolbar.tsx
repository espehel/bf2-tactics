import React, { FC, useCallback, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTools } from '../state/Tools';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: 'green',
  },
  tool: {
    marginRight: theme.spacing(2),
  },
}));

export type Tools = 'selection' | 'drawing';

const Toolbar: FC = () => {
  const classes = useStyles();
  const { activeTool, changeToolMode } = useTools();

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
