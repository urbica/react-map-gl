/* eslint-disable react/prop-types */

import React from 'react';
import MapGL from '../src';

const accessToken = process.env.STORYBOOK_MAPBOX_ACCESS_TOKEN;

const Map = props => (
  <MapGL
    style={props.style}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    accessToken={accessToken}
    latitude={37.757}
    longitude={-122.427}
    zoom={11}
  />
);

export default Map;
