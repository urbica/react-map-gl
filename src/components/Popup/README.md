React Component for [Mapbox GL JS Popup](https://docs.mapbox.com/mapbox-gl-js/api/#popup).

```jsx
import React from 'react';
import MapGL, { Popup } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={0}
  longitude={0}
  zoom={0}
>
  <Popup longitude={0} latitude={0} closeButton={false} closeOnClick={false}>
    Hi there! 👋
  </Popup>
</MapGL>;
```
