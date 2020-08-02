React Component for [Mapbox GL JS Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker).

```jsx
import React, { useState } from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [position, setPosition] = useState({
  longitude: 0,
  latitude: 0
});

const style = {
  padding: '10px',
  color: '#fff',
  cursor: 'pointer',
  background: '#1978c8',
  borderRadius: '6px'
};

const onDragEnd = (lngLat) => {
  setPosition({ longitude: lngLat.lng, latitude: lngLat.lat });
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
    longitude={position.longitude}
    latitude={position.latitude}
    onDragEnd={onDragEnd}
    draggable
  >
    <div style={style}>Hi there! 👋</div>
  </Marker>
</MapGL>;
```

## Marker onClick handler

```jsx
import React, { useState } from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [position, setPosition] = useState({
  longitude: 0,
  latitude: 0
});

const style = {
  padding: '10px',
  color: '#fff',
  cursor: 'pointer',
  background: '#1978c8',
  borderRadius: '6px'
};

const onMapClick = (event) => {
  setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
};

const onMarkerClick = (event) => {
  alert('You clicked on marker');
  event.stopPropagation();
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={0}
  longitude={0}
  zoom={0}
  onClick={onMapClick}
>
  <Marker
    longitude={position.longitude}
    latitude={position.latitude}
    onClick={onMarkerClick}
  >
    <div style={style}>Click me! ✨</div>
  </Marker>
</MapGL>;
```
