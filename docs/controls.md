- A `NavigationControl` control contains zoom buttons and a compass.
- Geolocate the user and then track their current location on the map using the `GeolocateControl`.
- A `FullscreenControl` control contains a button for toggling the map in and out of fullscreen mode.
- A `ScaleControl` control displays the ratio of a distance on the map to the corresponding distance on the ground.
- An `AttributionControl` control presents the map's attribution information.

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
  <NavigationControl showCompass showZoom position='top-right' />
  <GeolocateControl position='top-right' />
  <FullscreenControl position='top-right' />
  <AttributionControl
    compact={false}
    position='bottom-right'
    customAttribution='Custom attribution'
  />
  <ScaleControl unit='metric' position='bottom-right' />
</MapGL>
```
