import React, { FC } from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    maxWidth: 360,
  },
}));

interface Props {
  maps: Array<string>;
  onMapClick: (map: string) => void;
}

const MapList: FC<Props> = ({ maps, onMapClick }) => {
  const classes = useStyles();
  return (
    <List dense className={classes.root}>
      {maps.map((mapName) => {
        return (
          <ListItem
            key={mapName}
            divider
            button
            onClick={() => onMapClick(mapName)}
          >
            <ListItemAvatar>
              <Avatar
                alt={`Image of ${mapName}`}
                src={`maps/${mapName}/favoriteMap.png`}
              />
            </ListItemAvatar>
            <ListItemText primary={mapName} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default MapList;
