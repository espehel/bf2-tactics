import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {},
});

const Communication: FC = () => {
  const styles = useStyles();

  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}`);
    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };
  }, []);

  return <article className={styles.main}></article>;
};

export default Communication;
