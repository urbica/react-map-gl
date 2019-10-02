[Custom layers](https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface) allow a user to render directly into the map's GL context using the map's camera.

Here is an Uber [deck.gl](https://github.com/uber/deck.gl) usage example.

```jsx
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';
import MapGL, { CustomLayer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const myDeckLayer = new MapboxLayer({
  id: 'deckgl-arc',
  type: ArcLayer,
  data: [
    { source: [-122.3998664, 37.7883697], target: [-122.400068, 37.7900503] }
  ],
  getSourcePosition: (d) => d.source,
  getTargetPosition: (d) => d.target,
  getSourceColor: [255, 208, 0],
  getTargetColor: [0, 128, 255],
  getWidth: 8
});

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.79}
  longitude={-122.4}
  zoom={15}
  pitch={60}
  bearing={20}
>
  <CustomLayer layer={myDeckLayer} />
</MapGL>;
```
