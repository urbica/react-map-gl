A `LanguageControl` that modifies the layers of the map style to use the 'text-field' that matches the browser language.
⚠️ Require the package `@mapbox/mapbox-gl-language` (`npm install --save @mapbox/mapbox-gl-language`)

```jsx
import React from 'react';
import MapGL, { LangugageControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <LanguageControl options={{ defaultLanguage: 'fr' }} />
</MapGL>;
```
