React Component for [Mapbox GL JS Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker).

```jsx
import React from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';

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

const onDragEnd = lngLat => {
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
  <Marker
    longitude={state.longitude}
    latitude={state.latitude}
    onDragEnd={onDragEnd}
    draggable
  >
    <div style={style}>Hi there! 👋</div>
  </Marker>
</MapGL>;
```
