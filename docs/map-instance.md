To access Mapbox GL JS Map instance you have to wrap `MapGL` with high order component. You can access map instance using `ref` as show in the code below.

```jsx
class Map extends React.PureComponent {
  componentDidMount() {
    const map = this._map.getMap();
  }

  render() {
    return React.createElement(MapGL, {
      ref: ref => (this._map = ref),
      ...this.props
    });
  }
}

<Map
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>;
```

### Using `MapContext`

You can also use `MapContext.Consumer` to obtain map instance.

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
