import mapboxgl from 'mapbox-gl';
import queryRenderedFeatures from './queryRenderedFeatures';

const createMap = () => {
  const container = window.document.createElement('div');
  Object.defineProperty(container, 'offsetWidth', {
    value: 200,
    configurable: true
  });
  Object.defineProperty(container, 'offsetHeight', {
    value: 200,
    configurable: true
  });

  const map = new mapboxgl.Map({
    container,
    interactive: false,
    attributionControl: false,
    trackResize: true,
    style: {
      version: 8,
      sources: {},
      layers: []
    }
  });

  return map;
};

test('queryRenderedFeatures', () => {
  const map = createMap();
  const layerId = 'dummy';
  const position = [0, 0];
  const radius = 10;

  expect(queryRenderedFeatures(map, layerId, position)).toEqual([]);
  expect(queryRenderedFeatures(map, layerId, position, radius)).toEqual([]);
});
