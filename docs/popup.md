```jsx
const random = require("@turf/random");

const bbox = [-160, -70, 160, 70];
const [longitude, latitude] = random.randomPosition(bbox);

initialState = {
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  isOpenPopup: true,
  longitude,
  latitude
};

const onClick = () => {
  const [longitude, latitude] = random.randomPosition(bbox);
  setState({ longitude, latitude, isOpenPopup: true });
};

const onPopupClose = () => {
  setState({ isOpenPopup: false });
}

const Element = <div>Popup</div>;

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onClick={onClick}
  {...state.viewport}
>
{
  state.isOpenPopup &&
    <Popup
      longitude={state.longitude}
      latitude={state.latitude}
      onPopupClose={onPopupClose}
      closeOnClick={false}
      element={Element}
    />
  }
</MapGL>;
```
