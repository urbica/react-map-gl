// @flow

import mapboxgl from 'mapbox-gl';

export default (
  map: mapboxgl.Map,
  layerId: string,
  position: [number, number],
  radius: number
) => {
  const parameters = { layers: [layerId] };

  if (radius) {
    const bbox = [
      [position[0] - radius, position[1] - radius],
      [position[0] + radius, position[1] + radius]
    ];

    return map.queryRenderedFeatures(bbox, parameters);
  }

  return map.queryRenderedFeatures(position, parameters);
};
