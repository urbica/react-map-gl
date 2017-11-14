```jsx
const random = require('@turf/random');

const bbox = [-160, -70, 160, 70];
const points = random.randomPoint(50, { bbox });
points.features.forEach((point, index) => point.id = index);

initialState = {
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  },
  points: points.features
};

const style = {
  width: "20px",
  height: "20px",
  color: "#fff",
  background: "#1978c8",
  borderRadius: "20px",
  textAlign: "center"
};

const Element = <div style={style}/>;

const ClusterElement = ({ point_count_abbreviated }) =>
  <div style={{...style, background: "#f28a25" }}>{point_count_abbreviated}</div>;

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
>
  <Cluster
    radius={40}
    extent={512}
    nodeSize={64}
    element={ClusterElement}
  >
    {
      state.points.map(point => (
        <Marker
          key={point.id}
          longitude={point.geometry.coordinates[0]}
          latitude={point.geometry.coordinates[1]}
          element={Element}
        />
      ))
    }
  </Cluster>
</MapGL>
```