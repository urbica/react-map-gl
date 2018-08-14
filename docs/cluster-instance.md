You can access [supercluster](https://github.com/mapbox/supercluster) instance using `innerRef` as show in the code below.

Note: You have to install `supercluster` package to use `Cluster` component:

```shell
npm -i supercluster
```

```jsx
const random = require("@turf/random");

const bbox = [-160, -70, 160, 70];
const points = random.randomPoint(50, { bbox }).features;
points.forEach((point, index) => (point.id = index));

initialState = {
  points,
  supercluster: null,
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

const onClusterClick = cluster => {
  const { cluster_id } = cluster.properties;
  const zoom = state.supercluster.getClusterExpansionZoom(cluster_id);
  const [longitude, latitude] = cluster.geometry.coordinates;

  const newVewport = {
    ...state.viewport,
    latitude,
    longitude,
    zoom
  };

  setState({ viewport: newVewport });
};

const MarkerStyle = {
  width: "20px",
  height: "20px",
  color: "#fff",
  background: "#1978c8",
  borderRadius: "20px",
  textAlign: "center"
};

const MarkerElement = <div style={MarkerStyle} />;

const ClusterMarkerStyle = {
  ...MarkerStyle,
  cursor: "pointer",
  background: "#f28a25"
};

const ClusterElement = cluster => (
  <div style={ClusterMarkerStyle} onClick={onClusterClick.bind(this, cluster)}>
    {cluster.properties.point_count_abbreviated}
  </div>
);

<MapGL
  style={{ width: "100%", height: "400px" }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={viewport => setState({ viewport })}
  {...state.viewport}
>
  <Cluster
    innerRef={ref => setState({ supercluster: ref })}
    radius={40}
    extent={512}
    nodeSize={64}
    element={ClusterElement}
  >
    {state.points.map(point => (
      <Marker
        key={point.id}
        longitude={point.geometry.coordinates[0]}
        latitude={point.geometry.coordinates[1]}
        element={MarkerElement}
      />
    ))}
  </Cluster>
</MapGL>
```
