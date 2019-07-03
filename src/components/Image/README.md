Add an image to the style. This image can be used in `icon-image`,
`background-pattern`, `fill-pattern`, and `line-pattern`. An
{@link Map#error} event will be fired if there is not enough space in the
sprite to add this image.

Mapbox examples:

- [Add an icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image/)
- [Add a generated icon to the map](https://www.mapbox.com/mapbox-gl-js/example/add-image-generated/)

```js
import React from 'react';
import MapGL, { Source, Layer, Image } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 37.753574,
    longitude: -122.447303,
    zoom: 13
  },
  data: {
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
  }
};

const imageURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
>
  <Source id='point' type='geojson' data={state.data} />
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
