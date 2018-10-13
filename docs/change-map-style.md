```jsx
initialState = {
  styleId: "dark",
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const styles = {
  light: "mapbox://styles/mapbox/light-v9",
  dark: "mapbox://styles/mapbox/dark-v9",
};

const onButtonClick = () => {
  setState((state) => {
    const newStyleId = state.styleId === "light" ? "dark" : "light";
    return {...state, styleId: newStyleId };
  });
}

<React.Fragment>
  <button onClick={onButtonClick}>Change Map style</button>
  <MapGL
    style={{ width: "100%", height: "400px" }}
    mapStyle={styles[state.styleId]}
    accessToken={MAPBOX_ACCESS_TOKEN}
    {...state.viewport}
  />
</React.Fragment>
```
