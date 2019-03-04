[Custom layers](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface) allow a user to render directly into the map's GL context using the map's camera.

Here is an Uber [deck.gl](https://github.com/uber/deck.gl) usage example.

```jsx
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import MapGL, { CustomLayer } from '@urbica/react-map-gl';

const myDeckLayer = new MapboxLayer({
  id: 'my-scatterplot',
  type: ScatterplotLayer,
  data: [{ position: [-74.5, 40], size: 1000 }],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [255, 0, 0]
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={40}
  longitude={-74.5}
  zoom={9}
>
  <CustomLayer layer={myDeckLayer} />
</MapGL>;
```
