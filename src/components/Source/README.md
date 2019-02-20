[Sources](https://docs.mapbox.com/mapbox-gl-js/api/#sources) specify the geographic features to be rendered on the map.

```jsx
const Immutable = require('immutable');
const random = require('@turf/random');

initialState = {
  points: random.randomPoint(100),
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const source = { type: 'geojson', data: state.points };

const layer = Immutable.fromJS({
  id: 'points',
  type: 'circle',
  source: 'points',
  paint: {
    'circle-radius': 6,
    'circle-color': '#1978c8'
  }
});

const addPoints = () => {
  const randomPoints = random.randomPoint(100);
  const newFeatures = state.points.features.concat(randomPoints.features);
  const newPoints = { ...state.points, features: newFeatures };
  setState({ points: newPoints });
};

<div>
  <button onClick={addPoints}>+100 points</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    accessToken={MAPBOX_ACCESS_TOKEN}
    onViewportChange={viewport => setState({ viewport })}
    {...state.viewport}
  >
    <Source id='points' source={source} />
    <Layer layer={layer} />
  </MapGL>
</div>;
```
