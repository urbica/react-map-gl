[Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) is a JavaScript library that renders interactive maps from vector tiles and Mapbox styles using WebGL.

To use any of Mapbox’s tools, APIs, or SDKs, you’ll need a Mapbox [access token](https://www.mapbox.com/help/define-access-token/). Mapbox uses access tokens to associate requests to API resources with your account. You can find all your access tokens, create new ones, or delete existing ones on your [API access tokens page](https://www.mapbox.com/studio/account/tokens/).

This package is heavily inspired by [uber/react-map-gl](https://github.com/uber/react-map-gl).

## Static map

```jsx
const accessToken = require('../utils/accessToken');

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/streets-v9"
  accessToken={accessToken}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>
```

## Interactive map

```jsx
const accessToken = require('../utils/accessToken');

initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/streets-v9"
  accessToken={accessToken}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>
```

## Using with Immutable.js

```jsx
const Immutable = require('immutable');
const accessToken = require('../utils/accessToken');

initialState = {
  mapStyle: null,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9?access_token=${accessToken}`;

if (!state.mapStyle) {
  fetch(styleUrl)
    .then(r => r.json())
    .then(mapStyle =>
      setState({ mapStyle: Immutable.fromJS(mapStyle) })
    );
}

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle={state.mapStyle}
  accessToken={accessToken}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>
```

## onHover & onClick

```jsx
const Immutable = require('immutable');
const accessToken = require('../utils/accessToken');

const mapStyle = Immutable.fromJS({
  version: 8,
  sources: {
    marker: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', geometry: { type: 'Point', coordinates: [10, 10] } },
          { type: 'Feature', geometry: { type: 'Point', coordinates: [10, -10] } },
          { type: 'Feature', geometry: { type: 'Point', coordinates: [-10, -10] } },
          { type: 'Feature', geometry: { type: 'Point', coordinates: [-10, 10] } }
        ]
      }
    }
  },
  layers: [{
    id: 'marker',
    type: 'circle',
    source: 'marker',
    interactive: true, // this will make layer interactive
    paint: {
      'circle-radius': 16,
      'circle-color': '#f00'
    }
  }]
});

const onHover = (event) => {
  console.log('hover over features', event.features);
};

const onClick = (event) => {
  console.log('click on features', event.features);
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle={mapStyle}
  accessToken={accessToken}
  latitude={0}
  longitude={0}
  zoom={2}
  onHover={onHover}
  onClick={onClick}
/>
```