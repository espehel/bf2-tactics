import React, { FC, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useCanvas } from '../state/Canvas';

const useStyles = makeStyles((theme) => ({
  drawingBoard: {
    width: '1024px',
    height: '1024px',
    position: 'relative',
    margin: 'auto',
  },
  canvas: { 'z-index': '100' },
  background: { position: 'absolute', top: '0', left: '0' },
}));

interface Props {
  backgroundSrc: string;
}

const DrawingBoard: FC<Props> = ({ backgroundSrc }) => {
  const styles = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCanvas } = useCanvas();
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
    <section className={styles.drawingBoard}>
      <canvas id="draw-canvas" ref={canvasRef} className={styles.canvas} />
      <img
        className={styles.background}
        src={backgroundSrc}
        alt="Background of the drawingboard"
      ></img>
    </section>
  );
};

export default DrawingBoard;
