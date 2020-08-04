import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { Tools } from '../drawing/Toolbar';
import { useCanvas } from './Canvas';

const [ToolsProvider, useTools] = createUseContext(() => {
  const [activeTool, setActiveTool] = useState<Tools>('selection');
  const { onToolModeChanged } = useCanvas();

  const changeToolMode = useCallback(
    (nextTool: Tools) => () => {
      if (nextTool === 'selection') {
        if (activeTool !== 'selection') {
          onToolModeChanged(activeTool, false);
          onToolModeChanged('selection', true);
          setActiveTool('selection');
        }
      } else {
        onToolModeChanged(activeTool, false);
        if (nextTool === activeTool) {
          onToolModeChanged('selection', true);
          setActiveTool('selection');
        } else {
          onToolModeChanged(nextTool, true);
          setActiveTool(nextTool);
        }
      }
    },
    [activeTool, onToolModeChanged]
  );

  return { activeTool, changeToolMode };
});

export { ToolsProvider, useTools };
