Set filter to target layer. Layer id can be an id of any layer defined in style or defined by `<Layer />` component.

```js
import React from 'react';
import MapGL, { Source, Layer, Filter } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "foo": 1
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.44400024414062,
          37.82280243352756
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "foo": 2
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.37258911132812,
          37.76610103745479
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "foo": 3
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -122.48451232910155,
          37.75470124792827
        ]
      }
    }
  ]
};

initialState = {
  filterValue: 1 
};

const setFilterValue = (value) => ()=> {
  setState({filterValue: value})
}

<div>
  <button onClick={setFilterValue(1)}>1</button>
  <button onClick={setFilterValue(2)}>2</button>
  <button onClick={setFilterValue(3)}>3</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    accessToken={MAPBOX_ACCESS_TOKEN}
    latitude={37.78}
    longitude={-122.41}
    zoom={11}
  >
    <Source id="points" type="geojson" data={data} />
    <Layer
      id="points"
      type="circle"
      source="points"
      paint={{
        'circle-radius': 6,
        'circle-color': '#1978c8'
      }}
    />
    <Filter
      layerId='points'
      filter={['==', 'foo', state.filterValue]}
    />
  </MapGL>
</div>
```
