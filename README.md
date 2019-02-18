# Urbica React Mapbox GL JS

[![Build Status](https://img.shields.io/circleci/project/github/urbica/react-map-gl.svg?style=popout)](https://circleci.com/gh/urbica/react-map-gl)
![npm](https://img.shields.io/npm/dt/@urbica/react-map-gl.svg)
![npm](https://img.shields.io/npm/v/@urbica/react-map-gl.svg?style=popout)

React Component for Mapbox GL JS.

[Examples](https://urbica.github.io/react-map-gl/).

[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) is a JavaScript library that renders interactive maps from vector tiles and Mapbox styles using WebGL.

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

This package is heavily inspired by [uber/react-map-gl](https://github.com/uber/react-map-gl).

![Gallery](https://raw.githubusercontent.com/urbica/react-map-gl/master/gallery.jpg)

- [Installation](#installation)
- [List of React components](#list-of-react-components)
- [Examples](#examples)
  - [Static map](#static-map)
  - [Interactive map](#interactive-map)
  - [Map with `Source` and `Layer` components](#map-with-source-and-layer-components)
  - [Custom Layers support](#custom-layers-support)
- [Development](#development)

## Installation

```shell
npm install --save mapbox-gl immutable@4.0.0-rc.12 @urbica/react-map-gl
```

You may also want to install `supercluster` package for `Cluster` component.

## List of React components

`@urbica/react-map-gl` provides a set of components:

- [MapGL](https://urbica.github.io/react-map-gl/#mapgl)
- [Source](https://urbica.github.io/react-map-gl/#source)
- [Layer](https://urbica.github.io/react-map-gl/#layer)
- [CustomLayer](https://urbica.github.io/react-map-gl/#custom-layers)
- [Cluster](https://urbica.github.io/react-map-gl/#cluster)
- [Popup](https://urbica.github.io/react-map-gl/#popup)
- [Marker](https://urbica.github.io/react-map-gl/#marker)
- [AttributionControl](https://urbica.github.io/react-map-gl/#controls)
- [FullscreenControl](https://urbica.github.io/react-map-gl/#controls)
- [GeolocateControl](https://urbica.github.io/react-map-gl/#controls)
- [NavigationControl](https://urbica.github.io/react-map-gl/#controls)
- [ScaleControl](https://urbica.github.io/react-map-gl/#controls)

## Examples

You can see more examples [here](https://urbica.github.io/react-map-gl/).

### Static map

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

### Interactive map

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

### Map with `Source` and `Layer` components

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

### Custom Layers support

[Custom layers](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface) allow a user to render directly into the map's GL context using the map's camera.

Here is an Uber [deck.gl](https://github.com/uber/deck.gl) usage example.

```jsx
import MapGL, { CustomLayer } from '@urbica/react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';

const myDeckLayer = new MapboxLayer({
  id: 'my-scatterplot',
  type: ScatterplotLayer,
  data: [{ position: [-74.5, 40], size: 1000 }],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [255, 0, 0]
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={40}
  longitude={-74.5}
  zoom={9}
>
  <CustomLayer layer={myDeckLayer} />
</MapGL>;
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
