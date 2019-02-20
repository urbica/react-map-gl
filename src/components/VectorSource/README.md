Add a [vector source](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-vector) to a map.

```jsx
const Immutable = require('immutable');

initialState = {
  viewport: {
    latitude: 37.753574,
    longitude: -122.447303,
    zoom: 13
  }
};

const layer = Immutable.fromJS({
  id: 'terrain-data',
  type: 'line',
  source: 'contour',
  'source-layer': 'contour',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#ff69b4',
    'line-width': 1
  }
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
>
  <VectorSource id='contour' url='mapbox://mapbox.mapbox-terrain-v2' />
  <Layer layer={layer} />
</MapGL>;
```
