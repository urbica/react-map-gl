```jsx
const Immutable = require('immutable');
const random = require('@turf/random');

const points = random.randomPoint(10);
points.features.forEach((feature, index) => {
  feature.properties.id = index;
});

initialState = {
  sources: Immutable.fromJS({
    markers: {
      type: 'geojson',
      data: points
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
      filter: ['==', 'id', '']
    }
  }),
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const onEnter = (event) => {
  const feature = event.features[0];
  if (!feature) return;

  const newLayers = state.layers.setIn(
    ['highlighted-marker', 'filter', 2],
    feature.properties.id
  );

  setState({ layers: newLayers });
};

const onLeave = (event) => {
  const newLayers = state.layers.setIn(
    ['highlighted-marker', 'filter', 2],
    ''
  );

  setState({ layers: newLayers });
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  {...state.viewport}
>
  <Source id='markers' source={state.sources.get('markers')} />
  <Layer
    onEnter={onEnter}
    onLeave={onLeave}
    layer={state.layers.get('markers')}
  />
  <Layer layer={state.layers.get('highlighted-marker')} />
</MapGL>
```