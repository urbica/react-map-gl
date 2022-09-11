A `Fog` component sets the fog property of the style.

```jsx
import React, { useState } from 'react';
import MapGL, { Fog } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [viewport, setViewport] = useState({
  latitude: 37.830348,
  longitude: -100.486052,
  pitch: 90,
  zoom: 2
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={setViewport}
  {...viewport}
>
  <Fog
    range={[0.8, 8]}
    color={'#dc9f9f'}
    horizon-blend={0.5}
    high-color={'#245bde'}
    space-color={'#000000'}
    star-intensity={0.15}
  />
</MapGL>;
```
