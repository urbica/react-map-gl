```jsx
const random = require('@turf/random');

const bbox = [-160, -70, 160, 70];
const [longitude, latitude] = random.randomPosition(bbox);

initialState = {
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  longitude,
  latitude
};

const style = {
  padding: '10px',
  color: '#fff',
  cursor: 'pointer',
  background: '#1978c8',
  borderRadius: '6px'
};

const onClick = () => {
  const [longitude, latitude] = random.randomPosition(bbox);
  setState({ longitude, latitude });
};

const onDragEnd = lngLat => {
  setState({ longitude: lngLat.lng, latitude: lngLat.lat });
};

const Element = (
  <div onClick={onClick} style={style}>
    Click me!
    <br />
    Drag me!
  </div>
);

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  {...state.viewport}
>
  <Marker
    longitude={state.longitude}
    latitude={state.latitude}
    element={Element}
    onDragEnd={onDragEnd}
    draggable
  />
</MapGL>;
```
