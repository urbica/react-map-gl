Add an image to the style. This image can be used in `icon-image`,
`background-pattern`, `fill-pattern`, and `line-pattern`.

Mapbox examples:

- [Add an icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image/)
- [Add a generated icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image-generated/)

```js
import React, { useState } from 'react';
import MapGL, { Source, Layer, Image } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [viewport, setViewport] = useState({
  latitude: 37.753574,
  longitude: -122.447303,
  zoom: 13
});

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [-122.45, 37.75]
      }
    }
  ]
};

const imageURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={setViewport}
  {...viewport}
>
  <Source id='point' type='geojson' data={data} />
  <Image id='my-image' image={imageURL} />
  <Layer
    id='image-layer'
    type='symbol'
    source='point'
    layout={{
      'icon-image': 'my-image',
      'icon-size': 0.25
    }}
  />
</MapGL>;
```
