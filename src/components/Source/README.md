[Sources](https://docs.mapbox.com/mapbox-gl-js/api/#sources) specify the geographic features to be rendered on the map.

## GeoJSON Source

A [GeoJSON source](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-geojson). Data must be provided via a `data` property, whose value can be a URL or inline GeoJSON.

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 45.137451890638886,
    longitude: -68.13734351262877,
    zoom: 5
  }
};

const data = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-67.13734351262877, 45.137451890638886],
        [-66.96466, 44.8097],
        [-68.03252, 44.3252],
        [-69.06, 43.98],
        [-70.11617, 43.68405],
        [-70.64573401557249, 43.090083319667144],
        [-70.75102474636725, 43.08003225358635],
        [-70.79761105007827, 43.21973948828747],
        [-70.98176001655037, 43.36789581966826],
        [-70.94416541205806, 43.46633942318431],
        [-71.08482, 45.3052400000002],
        [-70.6600225491012, 45.46022288673396],
        [-70.30495378282376, 45.914794623389355],
        [-70.00014034695016, 46.69317088478567],
        [-69.23708614772835, 47.44777598732787],
        [-68.90478084987546, 47.184794623394396],
        [-68.23430497910454, 47.35462921812177],
        [-67.79035274928509, 47.066248887716995],
        [-67.79141211614706, 45.702585354182816],
        [-67.13734351262877, 45.137451890638886]
      ]
    ]
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
>
  <Source id="maine" type="geojson" data={data} />
  <Layer
    id="maine"
    type="fill"
    source="maine"
    paint={{
      'fill-color': '#088',
      'fill-opacity': 0.8
    }}
  />
</MapGL>;
```

Drawing a GeoJSON line on a map.

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 37.830348,
    longitude: -122.486052,
    zoom: 15
  }
};

const data = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [
      [-122.48369693756104, 37.83381888486939],
      [-122.48348236083984, 37.83317489144141],
      [-122.48339653015138, 37.83270036637107],
      [-122.48356819152832, 37.832056363179625],
      [-122.48404026031496, 37.83114119107971],
      [-122.48404026031496, 37.83049717427869],
      [-122.48348236083984, 37.829920943955045],
      [-122.48356819152832, 37.82954808664175],
      [-122.48507022857666, 37.82944639795659],
      [-122.48610019683838, 37.82880236636284],
      [-122.48695850372314, 37.82931081282506],
      [-122.48700141906738, 37.83080223556934],
      [-122.48751640319824, 37.83168351665737],
      [-122.48803138732912, 37.832158048267786],
      [-122.48888969421387, 37.83297152392784],
      [-122.48987674713133, 37.83263257682617],
      [-122.49043464660643, 37.832937629287755],
      [-122.49125003814696, 37.832429207817725],
      [-122.49163627624512, 37.832564787218985],
      [-122.49223709106445, 37.83337825839438],
      [-122.49378204345702, 37.83368330777276]
    ]
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
>
  <Source id="route" type="geojson" data={data} />
  <Layer
    id="route"
    type="line"
    source="route"
    layout={{
      'line-join': 'round',
      'line-cap': 'round'
    }}
    paint={{
      'line-color': '#888',
      'line-width': 8
    }}
  />
</MapGL>;
```

### Updating GeoJSON Source Data

```jsx
import React from 'react';
import { randomPoint } from '@turf/random';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  points: randomPoint(100),
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const addPoints = () => {
  const randomPoints = randomPoint(100);
  const newFeatures = state.points.features.concat(randomPoints.features);
  const newPoints = { ...state.points, features: newFeatures };
  setState({ points: newPoints });
};

<React.Fragment>
  <button onClick={addPoints}>+100 points</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={MAPBOX_ACCESS_TOKEN}
    onViewportChange={(viewport) => setState({ viewport })}
    {...state.viewport}
  >
    <Source id="points" type="geojson" data={state.points} />
    <Layer
      id="points"
      type="circle"
      source="points"
      paint={{
        'circle-radius': 6,
        'circle-color': '#1978c8'
      }}
    />
  </MapGL>
</React.Fragment>;
```

## Vector Source

Add a [vector source](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-vector) to a map.

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
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
>
  <Source id="contour" type="vector" url="mapbox://mapbox.mapbox-terrain-v2" />
  <Layer
    id="contour"
    type="line"
    source="contour"
    source-layer="contour"
    paint={{
      'line-color': '#877b59',
      'line-width': 1
    }}
  />
</MapGL>;
```

## Raster Source

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
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
>
  <Source
    id="raster"
    type="raster"
    tileSize={256}
    tiles={['https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png']}
  />
  <Layer id="raster" type="raster" source="raster" />
</MapGL>;
```

## Dynamic Source URLs

```jsx
import React from 'react';
import { randomPoint } from '@turf/random';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const sourceURLs = {
  first: 'mapbox://stepankuzmin.ck0glwxo402ld2omagmzc2gma-7pqww',
  second: 'mapbox://stepankuzmin.ck0glym6u02ls2omawvm9vi4y-9xid1'
};

initialState = {
  sourceURL: sourceURLs.first,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 9
  }
};

const toggleSourceURL = () => {
  setState((state) => {
    const nextSourceURL =
      state.sourceURL === sourceURLs.first ? sourceURLs.second : sourceURLs.first;

    return { sourceURL: nextSourceURL };
  });
};

<React.Fragment>
  <button onClick={toggleSourceURL}>Toggle Source URL</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={MAPBOX_ACCESS_TOKEN}
    onViewportChange={(viewport) => setState({ viewport })}
    {...state.viewport}
  >
    <Source id="sf-points" type="vector" url={state.sourceURL} />
    <Layer
      id="sf-points"
      type="circle"
      source="sf-points"
      source-layer="sf-points"
      paint={{
        'circle-radius': 6,
        'circle-color': '#1978c8'
      }}
    />
  </MapGL>
</React.Fragment>;
```

## Dynamic Source Tiles

```jsx
import React from 'react';
import { randomPoint } from '@turf/random';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const sourceTiles = {
  toner: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  watercolor: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
};

initialState = {
  sourceTiles: sourceTiles.toner,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 9
  }
};

const toggleSourceTiles = () => {
  setState((state) => {
    const nextSourceTiles =
      state.sourceTiles === sourceTiles.toner
        ? sourceTiles.watercolor
        : sourceTiles.toner;

    return { sourceTiles: nextSourceTiles };
  });
};

<React.Fragment>
  <button onClick={toggleSourceTiles}>Toggle Source Tiles</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={MAPBOX_ACCESS_TOKEN}
    onViewportChange={(viewport) => setState({ viewport })}
    {...state.viewport}
  >
    <Source id="raster" type="raster" tiles={[state.sourceTiles]} />
    <Layer id="raster" type="raster" source="raster" />
  </MapGL>
</React.Fragment>;
```
