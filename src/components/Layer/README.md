[Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) specify the Sources styles. The type of layer is specified by the `'type'` property, and must be one of `background`, `fill`, `line`, `symbol`, `raster`, `circle`, `fill-extrusion`, `heatmap`, `hillshade`.

Except for layers of the `background` type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```jsx
import React, { useState } from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [viewport, setViewport] = useState({
  latitude: 37.78,
  longitude: -122.41,
  zoom: 11
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={setViewport}
  {...viewport}
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

You can add the `before` prop with the id of an existing layer to insert the new layer before. If this prop is omitted, the layer will be appended to the end of the layers array:

```xml
<Layer id='below' before='above' />
```

```jsx
import React, { useState } from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const data = {
  red: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.4393653869629, 37.771664582389825],
          [-122.41936683654784, 37.771664582389825],
          [-122.41936683654784, 37.78679259356557],
          [-122.4393653869629, 37.78679259356557],
          [-122.4393653869629, 37.771664582389825]
        ]
      ]
    }
  },
  green: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.43687629699707, 37.772750103327695],
          [-122.41722106933594, 37.772750103327695],
          [-122.41722106933594, 37.789031004883654],
          [-122.43687629699707, 37.789031004883654],
          [-122.43687629699707, 37.772750103327695]
        ]
      ]
    }
  },
  blue: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-122.43498802185059, 37.7697648824009],
          [-122.4151611328125, 37.7697648824009],
          [-122.4151611328125, 37.78557161335955],
          [-122.43498802185059, 37.78557161335955],
          [-122.43498802185059, 37.7697648824009]
        ]
      ]
    }
  }
};

const [beforeOrder, setBeforeOrder] = useState({
  red: 'green',
  green: 'blue',
  blue: undefined
});

const [viewport, setViewport] = useState({
  latitude: 37.78,
  longitude: -122.41,
  zoom: 13
});

const onChange = (layerId, event) => {
  const before = event.target.value || undefined;
  setBeforeOrder({ ...beforeOrder, [layerId]: before });
};

<React.Fragment>
  {Object.entries(beforeOrder).map(([layerId, before]) => (
    <label key={layerId}>
      {layerId} before
      <select value={before} onChange={onChange.bind(this, layerId)}>
        <option value={undefined} />
        {Object.keys(beforeOrder)
          .filter((_layerId) => layerId !== _layerId)
          .map((layerId) => (
            <option key={layerId} value={layerId}>
              {layerId}
            </option>
          ))}
      </select>
      <br />
    </label>
  ))}
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    accessToken={MAPBOX_ACCESS_TOKEN}
    onViewportChange={setViewport}
    {...viewport}
  >
    {Object.entries(beforeOrder).map(([layerId, before]) => (
      <React.Fragment key={layerId}>
        <Source id={layerId} type='geojson' data={data[layerId]} />
        <Layer
          id={layerId}
          before={before}
          type='fill'
          source={layerId}
          paint={{
            'fill-color': layerId,
            'fill-opacity': 0.8
          }}
        />
      </React.Fragment>
    ))}
  </MapGL>
</React.Fragment>;
```
