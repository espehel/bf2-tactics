import React, { FC, useCallback } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTools } from '../state/Tools';

interface ColorItemProps {
  color: string;
}

const useColorItemStyles = makeStyles(() => ({
  colorItem: {
    height: '2em',
    width: '4em',
    backgroundColor: (props: ColorItemProps) => props.color,
  },
}));

const useStyles = makeStyles(() => ({
  icon: {
    display: 'none',
  },
  select: { paddingRight: '0 !important' },
}));

const ColorItem: FC<ColorItemProps> = (props) => {
  const classes = useColorItemStyles(props);
  return <Paper className={classes.colorItem} />;
};

const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];

const PencilColorSelect: FC = () => {
  const classes = useStyles();
  const { changePencilMode } = useTools();

  const handleOnColorSelect = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      changePencilMode(event.target.value);
    },
    [changePencilMode]
  );

  return (
    <Select
      autoWidth
      defaultValue={'yellow'}
      classes={classes}
      onChange={handleOnColorSelect}
    >
      {colors.map((color) => (
        <MenuItem value={color} key={color}>
          <ColorItem color={color} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default PencilColorSelect;
