import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { fabric } from 'fabric';
import { Tools } from '../drawing/Toolbar';

const [CanvasProvider, useCanvas] = createUseContext(() => {
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

  return { canvas, setCanvas, onToolModeChanged };
});

export { CanvasProvider, useCanvas };
