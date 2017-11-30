const isBrowser = !(
  Object.prototype.toString.call(global.process) === '[object process]' &&
  !global.process.browser
);

const mapboxgl = isBrowser ? require('mapbox-gl') : null;

export default mapboxgl;
