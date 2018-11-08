// @flow

const isBrowser = !(
  Object.prototype.toString.call(global.process) === '[object process]' && !global.process.browser
);

// $FlowFixMe
const mapboxgl: MapboxGL = isBrowser ? require('mapbox-gl') : null;

export default mapboxgl;
