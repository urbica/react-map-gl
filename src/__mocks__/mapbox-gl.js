// LngLatBounds
function LngLatBounds() {}
LngLatBounds.prototype.toArray = () => [[-180, -90], [180, 90]];

// Map
function Map() {
  this._sources = {};

  this.flyTo = jest.fn();
  this.getCanvas = jest.fn(() => ({ style: { cursor: 'default' } }));
  this.getCenter = jest.fn(() => ({ lat: 0, lng: 0 }));
  this.getBearing = jest.fn(() => 0);
  this.getPitch = jest.fn(() => 0);
  this.getZoom = jest.fn(() => 0);
  this.getStyle = jest.fn(() => {});
  this.queryRenderedFeatures = jest.fn(() => []);

  return this;
}

Map.prototype.once = function once(_, listener, fn) {
  const handler = typeof listener === 'function' ? listener : fn;
  handler({ target: this });
};

Map.prototype.on = function on(_, listener, fn) {
  const handler = typeof listener === 'function' ? listener : fn;
  handler({ target: this });
};

Map.prototype.addSource = function addSource(name, source) {
  this._sources[name] = source;
};

Map.prototype.removeSource = function removeSource(name) {
  delete this._sources[name];
};

Map.prototype.remove = function remove() {};
Map.prototype.addLayer = function addLayer() {};
Map.prototype.getLayer = function addLayer() {};
Map.prototype.removeLayer = function removeLayer() {};
Map.prototype.addControl = function addControl() {};
Map.prototype.removeControl = function removeControl() {};

Map.prototype.getBounds = () => new LngLatBounds();

function Popup() {
  this.setLngLat = jest.fn(() => this);
  this.addTo = jest.fn(() => this);
  this.setDOMContent = jest.fn(() => this);
  return this;
}

function Marker() {
  this.setLngLat = jest.fn(() => this);
  this.addTo = jest.fn(() => this);
  return this;
}

function AttributionControl() {
  return this;
}

function FullscreenControl() {
  return this;
}

function GeolocateControl() {
  return this;
}

function NavigationControl() {
  return this;
}

function ScaleControl() {
  return this;
}

module.exports = {
  Map,
  Popup,
  Marker,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  supported: () => true
};
