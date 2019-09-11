A `TrafficControl` add control to toggle traffic on map. See [Mapbox-gl-traffic
](https://github.com/mapbox/mapbox-gl-traffic) examples.

⚠️ Requires the `@mapbox/mapbox-gl-traffic` package to be installed:

```shell
npm install --save @mapbox/mapbox-gl-traffic
```

...or

```shell
yarn add @mapbox/mapbox-gl-traffic
```

```js
import React from 'react';
import MapGL, { TrafficControl } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-traffic/mapbox-gl-traffic.css';

initialState = {
  showTraffic: false,
  showTrafficButton: true
};

const toggleTraffic = () => setState({showTraffic: !state.showTraffic});
const toggleButton = () => setState({showTrafficButton: !state.showTrafficButton});

<div>
  <button onClick={toggleTraffic}>
    toggle traffic
  </button>
  <button onClick={toggleButton}>
    toggle button
  </button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle='mapbox://styles/mapbox/light-v9'
    accessToken={MAPBOX_ACCESS_TOKEN}
    latitude={37.78}
    longitude={-122.41}
    zoom={11}
  >
    <TrafficControl
      showTraffic={state.showTraffic}
      showTrafficButton={state.showTrafficButton}
    />
  </MapGL>
</div>
```
