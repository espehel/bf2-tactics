import React, { FC, useCallback } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTools } from '../state/Tools';
import PencilColorSelect from './PencilColorSelect';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    padding: '0.5em',
  },
  active: {
    backgroundColor: 'green',
  },
  tool: {
    marginRight: theme.spacing(2),
  },
}));

export type Tools = 'selection' | 'drawing' | 'pencil-mode';

const Toolbar: FC = () => {
  const classes = useStyles();
  const { activeTool, changeToolMode } = useTools();

  const getClasses = useCallback(
    (tool: Tools): string =>
      tool === activeTool ? `${classes.active} ${classes.tool}` : classes.tool,
    [activeTool]
  );

  return (
    <section className={classes.toolBar}>
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
      <PencilColorSelect />
    </section>
  );
};

export default Toolbar;
