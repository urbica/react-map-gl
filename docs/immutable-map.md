```jsx
const Immutable = require('immutable');

initialState = {
  mapStyle: null,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9?access_token=${MAPBOX_ACCESS_TOKEN}`;

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
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>
```