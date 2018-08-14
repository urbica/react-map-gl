```jsx
initialState = {
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  isOpen: true,
  longitude: 0,
  latitude: 0
};

const onClick = ({ lngLat }) => {
  setState(state => ({
    ...state,
    longitude: lngLat.lng,
    latitude: lngLat.lat,
    isOpen: true
  }));
};

const onClose = () => {
  setState(state => ({ ...state, isOpen: false }));
};

const Element = <div>Popup</div>;

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onClick={onClick}
  {...state.viewport}
>
  {state.isOpen && (
    <Popup
      longitude={state.longitude}
      latitude={state.latitude}
      closeOnClick={false}
      onClose={onClose}
      element={Element}
    />
  )}
</MapGL>
```
