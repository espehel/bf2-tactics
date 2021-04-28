import createUseContext from 'constate';
import { useCallback, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { Tools } from '../drawing/Toolbar';
import { debounce } from 'throttle-debounce';
import { useSpace } from './Space';

const [CanvasProvider, useCanvas] = createUseContext(() => {
  const { updateCanvas, canvasJson } = useSpace();
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  const onToolModeChanged = useCallback(
    (tool: Tools, value: any) => {
      if (canvas) {
        switch (tool) {
          case 'drawing': {
            canvas.isDrawingMode = value;
            break;
          }
          case 'pencil-mode': {
            canvas.freeDrawingBrush.color = value;
          }
        }
      }
    },
    [canvas]
  );

  const handleSetCanvas = useCallback(
    (elementId: string, width: number, height: number) => {
      const newCanvas = new fabric.Canvas(elementId, {
        width,
        height,
      });
      newCanvas.freeDrawingBrush.color = 'yellow';
      newCanvas.on(
        'after:render',
        debounce(500, (event) => {
          if (event.hasOwnProperty('ctx')) {
            updateCanvas(newCanvas.toJSON());
          }
        })
      );
      setCanvas(newCanvas);
    },
    [updateCanvas]
  );

  useEffect(() => {
    if (canvas && canvasJson) {
      console.log('started loading json');
      canvas.loadFromJSON(canvasJson, () => {
        console.log('finished loading json');
      });
    }
  }, [canvas, canvasJson]);

  return { canvas, setCanvas: handleSetCanvas, onToolModeChanged };
});

export { CanvasProvider, useCanvas };
