An `AttributionControl` control presents the map's attribution information.

```jsx
<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
  attributionControl={false}
>
  <AttributionControl
    position='bottom-right'
    customAttribution='Custom attribution'
  />
</MapGL>
```
