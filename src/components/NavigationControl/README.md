A `NavigationControl` control contains zoom buttons and a compass.

```jsx
import React from 'react';
import MapGL, { NavigationControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <NavigationControl showCompass showZoom position='top-right' />
</MapGL>;
```
