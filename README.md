# Urbica React Mapbox GL JS

[![npm](https://img.shields.io/npm/v/@urbica/react-map-gl.svg)](https://www.npmjs.com/package/@urbica/react-map-gl)
[![CircleCI](https://img.shields.io/circleci/project/github/urbica/react-map-gl.svg)](https://circleci.com/gh/urbica/react-map-gl/tree/master)

React Component for Mapbox GL JS.

[Examples](https://urbica.github.io/react-map-gl/).

[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) is a JavaScript library that renders interactive maps from vector tiles and Mapbox styles using WebGL.

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

This package is heavily inspired by [uber/react-map-gl](https://github.com/uber/react-map-gl).

![Gallery](https://raw.githubusercontent.com/urbica/react-map-gl/master/gallery.jpg)

## Installation

    npm install --save mapbox-gl immutable@4.0.0-rc.9 @urbica/react-map-gl

## Example

Static map

```jsx
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = <TOKEN> // Mapbox access token

<MapGL
  style={{ width: "400px", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={accessToken}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>
```

Interactive map

```jsx
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = <TOKEN> // Mapbox access token

<MapGL
  style={{ width: '400px', height: '400px' }}
  accessToken={accessToken}
  mapStyle="mapbox://styles/mapbox/streets-v9"
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onViewportChange={viewport => {
    // Call `setState` and use the state to update the map.
  }}
/>
```

Map with `Source` and `Layer` components

```jsx
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import Immutable from "immutable";
import random from "@turf/random";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = <TOKEN> // Mapbox access token

const source = Immutable.fromJS({
  type: "geojson",
  data: random.randomPoint(10)
});

const layer = Immutable.fromJS({
  id: "markers",
  type: "circle",
  source: "markers",
  paint: {
    "circle-radius": 16,
    "circle-color": "#1978c8"
  }
});

<MapGL
  style={{ width: "400px", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={0}
  longitude={0}
  zoom={0}
>
  <Source id="markers" source={source} />
  <Layer layer={layer} />
</MapGL>
```

See [Examples](https://urbica.github.io/react-map-gl/) for more info.

## Development

[![Greenkeeper badge](https://badges.greenkeeper.io/urbica/react-map-gl.svg)](https://greenkeeper.io/)

Install project dependencies and check that the tests run

    npm install
    npm test

Then start `react-styleguidist` by running

    MAPBOX_ACCESS_TOKEN=<TOKEN> npm start

where `<TOKEN>` is a valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/).
