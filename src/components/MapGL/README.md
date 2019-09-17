The `MapGL` component represents map on the page.

### Static map

By default, `MapGL` component renders in a static mode. That means that the user cannot interact with the map.

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>;
```

### Interactive map

In most cases, you will want the user to interact with the map. To do this, you need to provide `onViewportChange` handler, that will update map viewport state.

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={state.viewport.latitude}
  longitude={state.viewport.longitude}
  zoom={state.viewport.zoom}
  onViewportChange={(viewport) => setState({ viewport })}
/>;
```

### Changing Map Style

```jsx
import React from 'react';
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const styles = {
  light: 'mapbox://styles/mapbox/light-v9',
  dark: 'mapbox://styles/mapbox/dark-v9'
};

initialState = {
  styleId: 'light',
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

<React.Fragment>
  <button onClick={() => setState({ styleId: 'light' })}>light</button>
  <button onClick={() => setState({ styleId: 'dark' })}>dark</button>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle={styles[state.styleId]}
    accessToken={MAPBOX_ACCESS_TOKEN}
    latitude={state.viewport.latitude}
    longitude={state.viewport.longitude}
    zoom={state.viewport.zoom}
    onViewportChange={(viewport) => setState({ viewport })}
  />
</React.Fragment>;
```

### Using JSON Map Style

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  mapStyle: null,
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const mapStyleUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v9?access_token=${MAPBOX_ACCESS_TOKEN}`;

if (!state.mapStyle && setState) {
  fetch(mapStyleUrl)
    .then((response) => response.json())
    .then((mapStyle) => setState({ mapStyle }));
}

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle={state.mapStyle}
  accessToken={MAPBOX_ACCESS_TOKEN}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
/>;
```

### Viewport Change Methods

There are two props `viewportChangeMethod` and `viewportChangeOptions` that controls how `MapGL` component reacts to the new viewport props.

You can find list of available `viewportChangeOptions` [here](https://docs.mapbox.com/mapbox-gl-js/api/#animationoptions).

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewportChangeMethod: 'flyTo',
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const onChange = (event) => {
  setState({ viewportChangeMethod: event.target.value });
};

const onClick = (event) => {
  const { lngLat } = event;

  const newVewport = {
    ...state.viewport,
    latitude: lngLat.lat,
    longitude: lngLat.lng
  };

  setState({ viewport: newVewport });
};

<React.Fragment>
  Select viewportChangeMethod and click on the map
  <select value={state.viewportChangeMethod} onChange={onChange}>
    <option value="flyTo">flyTo</option>
    <option value="jumpTo">jumpTo</option>
    <option value="easeTo">easeTo</option>
  </select>
  <MapGL
    style={{ width: '100%', height: '400px' }}
    mapStyle="mapbox://styles/mapbox/light-v9"
    accessToken={MAPBOX_ACCESS_TOKEN}
    onClick={onClick}
    onViewportChange={(viewport) => setState({ viewport })}
    viewportChangeMethod={state.viewportChangeMethod}
    {...state.viewport}
  />
</React.Fragment>;
```

### Events

`mapbox-gl` emit [events](https://www.mapbox.com/mapbox-gl-js/api/#events) in response to user interactions or changes in state.

You can find full list of supported props in [eventProps](https://github.com/urbica/react-map-gl/blob/master/src/components/MapGL/eventProps.js).

Here is an example for `onClick` prop.

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

initialState = {
  viewport: {
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  }
};

const onClick = (event) => {
  const { lngLat } = event;

  const newVewport = {
    ...state.viewport,
    latitude: lngLat.lat,
    longitude: lngLat.lng
  };

  setState({ viewport: newVewport });
};

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  onClick={onClick}
  onViewportChange={(viewport) => setState({ viewport })}
  {...state.viewport}
/>;
```

#### Layer-specific events

You can also set layer-specific event-handlers passing prop in the form of the array where the first element is a layer id and the second element is an event handler:

```markup
onClick={['national_park', onClick]}
```

### Getting Mapbox GL JS Map Instance

#### Using `MapContext`

To access Mapbox GL JS Map instance you can use `MapContext.Consumer` component.

```jsx
import React from 'react';
import MapGL, { MapContext } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

<MapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
>
  <MapContext.Consumer>
    {(map) => {
      map.setPaintProperty('water', 'fill-color', '#fdbdba');
      return;
    }}
  </MapContext.Consumer>
</MapGL>;
```

#### Using Ref

You can also call `getMap()` method on the `MapGL` [ref](https://reactjs.org/docs/refs-and-the-dom.html).

```jsx
import React from 'react';
import MapGL from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class MyMapGL extends React.PureComponent {
  constructor(props) {
    super(props);
    this._map = React.createRef();
  }

  componentDidMount() {
    const map = this._map.current.getMap();
    map.once('load', () => {
      map.setPaintProperty('water', 'fill-color', '#db7093');
    });
  }

  render() {
    return <MapGL {...this.props} ref={this._map} />;
  }
}

<MyMapGL
  style={{ width: '100%', height: '400px' }}
  mapStyle="mapbox://styles/mapbox/light-v9"
  accessToken={MAPBOX_ACCESS_TOKEN}
  latitude={37.78}
  longitude={-122.41}
  zoom={11}
/>;
```
