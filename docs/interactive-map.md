```jsx
initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>
```