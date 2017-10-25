# Urbica React Mapbox GL JS

[![Circle CI build status](https://circleci.com/gh/urbica/react-map-gl.svg?style=shield)](https://circleci.com/gh/urbica/react-map-gl/tree/master)

React Component for Mapbox GL JS.

[Examples](https://urbica.github.io/react-map-gl/).

[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) is a JavaScript library that renders interactive maps from vector tiles and Mapbox styles using WebGL.

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

This package is heavily inspired by [uber/react-map-gl](https://github.com/uber/react-map-gl).

![Gallery](https://raw.githubusercontent.com/urbica/react-map-gl/master/gallery.jpg)

## Installation

    npm install --save mapbox-gl immutable@4.0.0-rc.9 @urbica/react-map-gl

## Example

```js
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

See [Examples](https://urbica.github.io/react-map-gl/) for more info.

## Development

Install project dependencies and check that the tests run

    npm install
    npm test

Then start `react-styleguidist` by running

    MAPBOX_ACCESS_TOKEN=<TOKEN> npm start

where `<TOKEN>` is a valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/).