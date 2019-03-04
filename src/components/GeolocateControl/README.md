Geolocate the user and then track their current location on the map using the `GeolocateControl`.

```jsx
import React from 'react';
import MapGL, { GeolocateControl } from '@urbica/react-map-gl';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <GeolocateControl position='top-right' />
</MapGL>;
```
