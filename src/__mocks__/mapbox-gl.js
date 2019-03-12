// LngLatBounds
function LngLatBounds() {}
LngLatBounds.prototype.toArray = () => [[-180, -90], [180, 90]];

// Map
function Map() {
  this._sources = {};
  this._layers = [];

  this.flyTo = jest.fn();
  this.easeTo = jest.fn();
  this.jumpTo = jest.fn();

  this.getCanvas = jest.fn(() => ({ style: { cursor: 'default' } }));
  this.getCenter = jest.fn(() => ({ lat: 0, lng: 0 }));
  this.getBearing = jest.fn(() => 0);
  this.getPitch = jest.fn(() => 0);
  this.getZoom = jest.fn(() => 0);
  this.queryRenderedFeatures = jest.fn(() => []);
  this.setFeatureState = jest.fn();
  this.removeFeatureState = jest.fn();

  return this;
}

Map.prototype.once = function once(_, listener, fn) {
  const handler = typeof listener === 'function' ? listener : fn;
  handler({ target: this });
};

Map.prototype.on = function on(_, listener, fn) {
  const handler = typeof listener === 'function' ? listener : fn;

  const point = { x: 0, y: 0 };
  handler({ target: this, point });
};

Map.prototype.getStyle = function getStyle() {
  return {
    sources: this._sources,
    layers: this._layers
  };
};

Map.prototype.setStyle = jest.fn();

Map.prototype.addSource = function addSource(name, source) {
  this._sources[name] = source;
};

Map.prototype.getSource = function getSource(name) {
  if (!this._sources[name]) {
    return undefined;
  }

  return { ...this._sources[name], setData: jest.fn() };
};

Map.prototype.removeSource = function removeSource(name) {
  delete this._sources[name];
};

Map.prototype.addLayer = function addLayer(layer) {
  this._layers.push(layer);
};

Map.prototype.getLayer = function getLayer(id) {
  const index = this._layers.findIndex(layer => id === layer.id);
  if (index === -1) {
    return undefined;
  }

  return this._layers[index];
};

Map.prototype.moveLayer = jest.fn();

Map.prototype.removeLayer = function removeLayer(id) {
  const index = this._layers.findIndex(layer => id === layer.id);
  if (!this._layers[index]) {
    throw new Error();
  }

  this._layers.splice(index, 1);
};

Map.prototype.remove = jest.fn();
Map.prototype.addControl = jest.fn();
Map.prototype.removeControl = jest.fn();
Map.prototype.fire = jest.fn();

Map.prototype.setPaintProperty = jest.fn();
Map.prototype.setLayoutProperty = jest.fn();
Map.prototype.setFilter = jest.fn();

Map.prototype.getBounds = () => new LngLatBounds();

function Popup() {
  this.setLngLat = jest.fn(() => this);
  this.addTo = jest.fn(() => this);
  this.setDOMContent = jest.fn(() => this);
  this.remove = jest.fn();

  return this;
}

function Marker() {
  this.setLngLat = jest.fn(() => this);
  this.getLngLat = jest.fn(() => this);
  this.addTo = jest.fn(() => this);
  this.remove = jest.fn();

  return this;
}

Marker.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

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
