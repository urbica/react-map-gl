[Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) specify the Sources styles. The type of layer is specified by the `"type"` property, and must be one of `background`, `fill`, `line`, `symbol`, `raster`, `circle`, `fill-extrusion`, `heatmap`, `hillshade`.

Except for layers of the `background` type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```jsx
import React from 'react';
import MapGL, { VectorSource, Layer } from '@urbica/react-map-gl';

initialState = {
  viewport: {
    latitude: 37.753574,
    longitude: -122.447303,
    zoom: 13
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
>
  <VectorSource id='contours' url='mapbox://mapbox.mapbox-terrain-v2' />
  <Layer
    id='contours'
    type='line'
    source='contours'
    source-layer='contour'
    paint={{
      'line-color': '#877b59',
      'line-width': 1
    }}
  />
</MapGL>;
```
