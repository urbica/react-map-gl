// @flow
import type MapboxGL from 'mapbox-gl/src/index';
import isBrowser from './isBrowser';

// $FlowFixMe
const mapboxgl: MapboxGL = isBrowser ? require('mapbox-gl') : null;

export default mapboxgl;
