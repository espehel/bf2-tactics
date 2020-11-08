import createUseContext from 'constate';
import { useCallback, useState } from 'react';
import { useSpace } from './Space';

const [MainStateProvider, useMainState] = createUseContext(() => {
  const { space, changeMap } = useSpace();
  const [map, setMap] = useState('Dalian_plant');

  const handleSetMap = useCallback(
    (nextMap: string) => {
      if (space) {
        changeMap(nextMap);
      } else {
        setMap(nextMap);
      }
    },
    [space]
  );

  return { map: space ? space.map : map, setMap: handleSetMap };
});

export { MainStateProvider, useMainState };
