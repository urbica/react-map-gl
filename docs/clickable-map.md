```jsx
const Immutable = require('immutable');

initialState = {
  mapStyle: Immutable.fromJS({
    version: 8,
    sources: {},
    layers: []
  }),
  sources: Immutable.fromJS({
    markers: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: { id: 1 }, geometry: { type: 'Point', coordinates: [0, 20] } },
          { type: 'Feature', properties: { id: 2 }, geometry: { type: 'Point', coordinates: [-20, 0] } },
          { type: 'Feature', properties: { id: 3 }, geometry: { type: 'Point', coordinates: [20, 0] } }
        ]
      }
    }
  }),
  layers: Immutable.fromJS({
    markers: {
      id: 'markers',
      type: 'circle',
      source: 'markers',
      paint: {
        'circle-radius': 16,
        'circle-color': '#1978c8'
      }
    },
    'highlighted-marker': {
      id: 'highlighted-marker',
      type: 'circle',
      source: 'markers',
      paint: {
        'circle-radius': 16,
        'circle-color': '#f28a25'
      },
      filter: ['==', 'id', 0]
    }
  }),
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 2
  }
};

const onClick = (event) => {
  const feature = event.features[0];
  if (!feature) return;

  const newLayers = state.layers.setIn(
    ['highlighted-marker', 'filter', 2],
    feature.properties.id
  );

  setState({ layers: newLayers });
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle={state.mapStyle}
  accessToken={MAPBOX_ACCESS_TOKEN}
  {...state.viewport}
>
  <Source id='markers' source={state.sources.get('markers')} />
  <Layer layer={state.layers.get('markers')} onClick={onClick} />
  <Layer layer={state.layers.get('highlighted-marker')} />
</MapGL>
```