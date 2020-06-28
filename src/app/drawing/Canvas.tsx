import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar, { Tools } from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    height: '600px',
    border: 'solid',
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log('render', { canvas, canvasRef });

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(
        new fabric.Canvas('draw-canvas', {
          width: canvasRef.current.width,
          height: canvasRef.current.height,
        })
      );
    }
  }, [canvasRef]);

  const handleToolModeChanged = useCallback(
    (tool: Tools, value: boolean) => {
      if (canvas) {
        switch (tool) {
          case 'drawing': {
            canvas.isDrawingMode = value;
            break;
          }
        }
      }
    },
    [canvas]
  );

  return (
    <div className={classes.root}>
      <Toolbar onToolModeChanged={handleToolModeChanged} />
      <canvas id="draw-canvas" ref={canvasRef} />
    </div>
  );
};

export default Canvas;
