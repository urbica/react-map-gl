A `FullscreenControl` control contains a button for toggling the map in and out of fullscreen mode.

```jsx
<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <FullscreenControl position='top-left' />
</MapGL>
```
