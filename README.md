# Urbica React Mapbox GL JS

[![Circle CI build status](https://circleci.com/gh/urbica/react-map-gl.svg?style=shield)](https://circleci.com/gh/urbica/react-map-gl/tree/master)

React Component for Mapbox GL JS

![Gallery](https://raw.githubusercontent.com/urbica/react-map-gl/master/gallery.jpg)

## Installation

    npm install --save mapbox-gl immutable@4.0.0-rc.2 @urbica/react-map-gl

## Example

```js
import MapGL from '@urbica/react-map-gl';

const accessToken = <TOKEN> // Mapbox access token

<MapGL
  style={{ width: '400px', height: '400px' }}
  accessToken={accessToken}
  mapStyle="mapbox://styles/mapbox/streets-v9"
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onChangeViewport={viewport => {
    // Call `setState` and use the state to update the map.
  }}
/>
```

See [API](https://github.com/urbica/react-map-gl/blob/master/API.md) for more info.

## Development

Install project dependencies and check that the tests run

    npm install
    npm test

Then start the storybook by running the shortcut

    MAPBOX_ACCESS_TOKEN=<TOKEN> yarn styleguide

where `<TOKEN>` is a valid Mapbox [access token](https://www.mapbox.com/help/define-access-token/).