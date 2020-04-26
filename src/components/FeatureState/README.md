A `FeatureState` component sets the state of a feature. For example, you can use events and feature states to create a per feature hover effect.

```jsx
import React, { useState } from 'react';
import MapGL, { Source, Layer, FeatureState } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const [hoveredStateId, setHoveredStateId] = useState(null);

const [viewport, setViewport] = useState({
  latitude: 37.830348,
  longitude: -100.486052,
  zoom: 2
});

const onHover = (event) => {
  if (event.features.length > 0) {
    const nextHoveredStateId = event.features[0].id;
    if (hoveredStateId !== nextHoveredStateId) {
      setHoveredStateId(nextHoveredStateId);
    }
  }
};

const onLeave = () => {
  if (hoveredStateId) {
    setHoveredStateId(null);
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle='mapbox://styles/mapbox/light-v9'
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={setViewport}
  {...viewport}
>
  <Source
    id='states'
    type='geojson'
    data='https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
  />
  <Layer
    id='state-fills'
    type='fill'
    source='states'
    paint={{
      'fill-color': '#627BC1',
      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5]
    }}
    onHover={onHover}
    onLeave={onLeave}
  />
  {hoveredStateId && <FeatureState id={hoveredStateId} source='states' state={{ hover: true }} />}
</MapGL>;
```
