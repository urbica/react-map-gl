Static map

```jsx
<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>
```

Interactive map

```jsx
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

Using JSON map style

```jsx
initialState = {
  mapStyle: null,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const mapStyleUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v9?access_token=${MAPBOX_ACCESS_TOKEN}`;

if (!state.mapStyle && setState) {
  fetch(mapStyleUrl)
    .then(response => response.json())
    .then(mapStyle => setState({ mapStyle: mapStyle }));
}

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle={state.mapStyle}
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>;
```
