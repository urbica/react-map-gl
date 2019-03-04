### Using `MapContext`

You can also use `MapContext.Consumer` to obtain Mapbox GL JS Map instance.

```jsx
<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <MapContext.Consumer>
    {map => {
      map.setPaintProperty('water', 'fill-color', '#fdbdba');
      return;
    }}
  </MapContext.Consumer>
</MapGL>
```
