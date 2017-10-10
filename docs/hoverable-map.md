```jsx
const Immutable = require('immutable');

const sources = {
  markers: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: { id: 1 }, geometry: { type: 'Point', coordinates: [0, 10] } },
        { type: 'Feature', properties: { id: 2 }, geometry: { type: 'Point', coordinates: [-20, -10] } },
        { type: 'Feature', properties: { id: 3 }, geometry: { type: 'Point', coordinates: [20, -10] } }
      ]
    }
  }
};

const layers = [
  {
    id: 'markers',
    type: 'circle',
    source: 'markers',
    interactive: true, // this will make layer interactive
    paint: {
      'circle-radius': 16,
      'circle-color': '#1978c8'
    }
  },
  {
    id: 'highlighted-marker',
    type: 'circle',
    source: 'markers',
    interactive: true, // this will make layer interactive
    paint: {
      'circle-radius': 16,
      'circle-color': '#f28a25'
    },
    filter: ['==', 'id', '']
  }
];

initialState = {
  mapStyle: Immutable.fromJS({
    version: 8,
    sources,
    layers
  }),
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 2
  }
};

const onHover = (event) => {
  const feature = event.features[0];
  if (!feature) return;

  const newMapStyle = state.mapStyle.setIn(
    ['layers', 1, 'filter', 2],
    feature.properties.id
  );

  setState({ mapStyle: newMapStyle });
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle={state.mapStyle}
  accessToken={MAPBOX_ACCESS_TOKEN}
  onHover={onHover}
  {...state.viewport}
/>
```