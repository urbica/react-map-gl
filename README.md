# Urbica React Mapbox GL JS

[![Build Status](https://img.shields.io/circleci/project/github/urbica/react-map-gl.svg?style=popout)](https://circleci.com/gh/urbica/react-map-gl)
![npm](https://img.shields.io/npm/dt/@urbica/react-map-gl.svg)
![npm](https://img.shields.io/npm/v/@urbica/react-map-gl.svg)

React Component Library for [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js). Mapbox GL JS is a JavaScript library that renders interactive maps from vector tiles and Mapbox styles using WebGL. This project is intended to be as close as possible to the [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/).

This project is heavily inspired by [uber/react-map-gl](https://github.com/uber/react-map-gl).

- [Installation](#installation)
- [Components](#components)
- [Usage](#usage)
  - [Static Map](#static-map)
  - [Interactive Map](#interactive-map)
  - [MapGL with Source and Layer](#mapgl-with-source-and-layer)
  - [Custom Layers support](#custom-layers-support)
- [Contributing](#contributing)

![Gallery](https://raw.githubusercontent.com/urbica/react-map-gl/master/gallery.jpg)

## Installation

```shell
npm install --save mapbox-gl @urbica/react-map-gl
```

...or if you are using yarn:

```shell
yarn add mapbox-gl @urbica/react-map-gl
```

## Components

| Component                                               | Description                                                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [MapGL](src/components/MapGL)                           | Represents map on the page                                                                                             |
| [MapContext](src/components/MapContext)                 | React Context API for the map instance                                                                                 |
| [Source](src/components/Source)                         | [Sources](https://docs.mapbox.com/mapbox-gl-js/api/#sources) specify the geographic features to be rendered on the map |
| [Layer](src/components/Layer)                           | [Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) specify the `Sources` style                          |
| [CustomLayer](src/components/CustomLayer)               | Allow a user to render directly into the map's GL context                                                              |
| [Popup](src/components/Popup)                           | React Component for [Mapbox GL JS Popup](https://docs.mapbox.com/mapbox-gl-js/api/#popup)                              |
| [Marker](src/components/Marker)                         | React Component for [Mapbox GL JS Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker)                            |
| [FeatureState](src/components/FeatureState)             | Sets the state of a geographic feature rendered on the map                                                             |
| [AttributionControl](src/components/AttributionControl) | Represents the map's attribution information                                                                           |
| [FullscreenControl](src/components/FullscreenControl)   | Contains a button for toggling the map in and out of fullscreen mode                                                   |
| [GeolocateControl](src/components/GeolocateControl)     | Geolocate the user and then track their current location on the map                                                    |
| [NavigationControl](src/components/NavigationControl)   | Contains zoom buttons and a compass                                                                                    |
| [ScaleControl](src/components/ScaleControl)             | Displays the ratio of a distance on the map to the corresponding distance on the ground                                |

## Usage

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

See [Documentation](https://urbica.github.io/react-map-gl/) for more examples.

### Static Map

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>;
```

### Interactive Map

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>;
```

### MapGL with Source and Layer

[Sources](https://docs.mapbox.com/mapbox-gl-js/api/#sources) specify the geographic features to be rendered on the map.

[Layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) specify the Sources styles. The type of layer is specified by the `"type"` property, and must be one of `background`, `fill`, `line`, `symbol`, `raster`, `circle`, `fill-extrusion`, `heatmap`, `hillshade`.

Except for layers of the `background` type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
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

### Custom Layers support

[Custom layers](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface) allow a user to render directly into the map's GL context using the map's camera.

Here is an Uber [deck.gl](https://github.com/uber/deck.gl) usage example.

```jsx
import React from 'react';
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

## Contributing

[![Greenkeeper badge](https://badges.greenkeeper.io/urbica/react-map-gl.svg)](https://greenkeeper.io/)

Clone and install dependencies

```shell
git clone https://github.com/urbica/react-map-gl.git
cd react-map-gl
npm install
```

Start `react-styleguidist` server

```shell
MAPBOX_ACCESS_TOKEN=<TOKEN> npm start
```

where `<TOKEN>` is a valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/).

Run tests with

```shell
npm test
```
