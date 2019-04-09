A `LanguageControl` adds support for switching the language of your map style.

⚠️ Requires the `@mapbox/mapbox-gl-language` package to be installed:

```shell
npm install --save @mapbox/mapbox-gl-language
```

...or

```shell
yarn add @mapbox/mapbox-gl-language
```

```js
import React from 'react';
import MapGL, { LanguageControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <LanguageControl defaultLanguage='fr' />
</MapGL>;
```
