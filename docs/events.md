`mapbox-gl` emit [events](https://www.mapbox.com/mapbox-gl-js/api/#events) in response to user interactions or changes in state.

Here is an example for `onClick` prop.

You can find full list of supported props in [eventProps](https://github.com/urbica/react-map-gl/blob/master/src/components/MapGL/eventProps.js).

```jsx
initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const onClick = event => {
  const {
    lngLat: { lat: latitude, lng: longitude }
  } = event;

  const newVewport = {
    ...state.viewport,
    latitude,
    longitude
  };

  setState({ viewport: newVewport });
};

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onClick={onClick}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
/>;
```
