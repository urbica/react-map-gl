A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.

```jsx
import React from 'react';
import MapGL, { ScaleControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <ScaleControl unit='metric' position='bottom-right' />
</MapGL>;
```
