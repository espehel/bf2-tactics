import React, { FC } from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMainState } from './state/MainState';

const useStyles = makeStyles((theme) => ({
  mapList: {
    height: '100%',
    overflowY: 'scroll',
  },
}));

interface Props {
  maps: Array<string>;
}

const MapList: FC<Props> = ({ maps }) => {
  const classes = useStyles();
  const { setMap } = useMainState();
  return (
    <List dense className={classes.mapList}>
      {maps.map((mapName) => {
        return (
          <ListItem
            key={mapName}
            divider
            button
            onClick={() => setMap(mapName)}
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
