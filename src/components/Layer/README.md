[Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) specify the Sources styles. The type of layer is specified by the `"type"` property, and must be one of `background`, `fill`, `line`, `symbol`, `raster`, `circle`, `fill-extrusion`, `heatmap`, `hillshade`.

Except for layers of the `background` type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  <Source id='contours' type='vector' url='mapbox://mapbox.mapbox-terrain-v2' />
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

## Layer ordering

You can add the `before` prop with the id of an existing layer to insert the new layer before. If this prop is omitted, the layer will be appended to the end of the layers array.

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 40.6892,
    longitude: -74.5447,
    zoom: 8
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
>
  <Source
    id='wms-test-layer'
    type='raster'
    tileSize={256}
    tiles={[
      'https://geodata.state.nj.us/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
    ]}
  />
  <Layer
    id='wms-test-layer'
    type='raster'
    source='wms-test-layer'
    before='aeroway-taxiway'
  />
</MapGL>;
```
