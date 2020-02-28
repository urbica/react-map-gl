React Component for [Mapbox GL JS Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker).

```jsx
import React from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  longitude: 0,
  latitude: 0
};

const style = {
  padding: '10px',
  color: '#fff',
  cursor: 'pointer',
  background: '#1978c8',
  borderRadius: '6px'
};

const onDragEnd = (lngLat) => {
  setState({ longitude: lngLat.lng, latitude: lngLat.lat });
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={0}
  longitude={0}
  zoom={0}
>
  <Marker longitude={state.longitude} latitude={state.latitude} onDragEnd={onDragEnd} draggable>
    <div style={style}>Hi there! 👋</div>
  </Marker>
</MapGL>;
```

## Test

```jsx
import React from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  longitude: 0,
  latitude: 0
};

const onClick = ({ lngLat }) => {
  console.log('MAP CLICKED');
  setState({ longitude: lngLat.lng, latitude: lngLat.lat });
};

const onMarkerClick = (e) => {
  console.log('INPUT CLICKED');
  console.log(e.target);
  console.log(e.currentTarget);
  e.persist();
  e.nativeEvent.stopImmediatePropagation();
  e.stopPropagation();
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={0}
  longitude={0}
  zoom={0}
  onClick={onClick}
>
  <Marker longitude={state.longitude} latitude={state.latitude}>
    <div onClick={onMarkerClick}>
      <input type='text' />
    </div>
  </Marker>
</MapGL>;
```
