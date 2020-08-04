import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar, { Tools } from './Toolbar';
import { useTools } from '../state/Tools';
import { useCanvas } from '../state/Canvas';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1024px',
    height: '1024px',
    border: 'solid',
    padding: '',
  },
  canvas: {},
}));

const DrawingBoard = () => {
  const styles = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, setCanvas } = useCanvas();
  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(
        new fabric.Canvas('draw-canvas', {
          width: 1024,
          height: 1024,
        })
      );
    }
  }, [canvasRef]);

  return (
    <div className={styles.root}>
      <canvas id="draw-canvas" ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default DrawingBoard;
