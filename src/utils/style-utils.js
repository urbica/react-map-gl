/* @flow */

import { Map } from 'immutable';
import type { MapStyle } from '../types';

function getInteractiveLayerIds(mapStyle: MapStyle): Array<String> {
  if (Map.isMap(mapStyle)) {
    const layers = mapStyle.get('layers');
    if (layers) {
      return layers
        .filter(l => l.get('interactive'))
        .map(l => l.get('id'))
        .toJS();
    }
  }

  return [];
}

export default getInteractiveLayerIds;
