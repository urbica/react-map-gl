# Urbica React Mapbox GL JS

React Component for Mapbox GL JS

## Installation

    npm install --save @urbica/react-map-gl

## Example

```js
import MapGL from '@urbica/react-map-gl';

const accessToken = <...> // Mapbox access token

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

## Development

Install project dependencies and check that the tests run

    npm install
    npm test

Then start the storybook by running the shortcut

    STORYBOOK_MAPBOX_ACCESS_TOKEN=<TOKEN> npm run storybook

where `TOKEN` is a valid Mapbox access token