// LngLatBounds
function LngLatBounds() {}
LngLatBounds.prototype.toArray = () => [[-180, -90], [180, 90]];

// Map
function Map() {
  this._sources = {};
  this._images = {};
  this._layers = [];

  this.style = {
    sources: this._sources,
    layers: this._layers,
    sourceCaches: {}
  };

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
  handler({ target: this, originalEvent: true, point: { x: 0, y: 0 } });
};

Map.prototype.off = jest.fn();

Map.prototype.getStyle = function getStyle() {
  return this.style;
};

Map.prototype.setStyle = jest.fn();

Map.prototype.addSource = function addSource(name, source) {
  this._sources[name] = source;
  this.style.sourceCaches[name] = {
    clearTiles: jest.fn()
  };
};

Map.prototype.getSource = function getSource(name) {
  if (!this._sources[name]) {
    return undefined;
  }

  const source = {
    setData: jest.fn(),
    load: jest.fn(),
    _tileJSONRequest: {
      cancel: jest.fn()
    },
    ...this._sources[name]
  };

  return source;
};

Map.prototype.isSourceLoaded = function isSourceLoaded(name) {
  return !!this._sources[name];
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

Map.prototype.moveLayer = function moveLayer(id, before) {
  const index = this._layers.findIndex(layer => id === layer.id);
  const beforeIndex = this._layers.findIndex(layer => before === layer.id);
  if (!this._layers[index] || !this._layers[beforeIndex]) {
    throw new Error();
  }

  const layer = this._layers[index];
  this._layers.splice(index, 1);
  this._layers.splice(beforeIndex, 0, layer);
};

Map.prototype.removeLayer = function removeLayer(id) {
  const index = this._layers.findIndex(layer => id === layer.id);
  if (!this._layers[index]) {
    throw new Error();
  }

  this._layers.splice(index, 1);
};

Map.prototype.loadImage = function loadImage(url, callback) {
  const data = new Uint8Array([]);
  callback(null, data);
};

Map.prototype.addImage = function addImage(id, image) {
  this._images[id] = image;
};

Map.prototype.updateImage = function updateImage(id, image) {
  this._images[id] = image;
};

Map.prototype.hasImage = function hasImage(id) {
  return !!this._images[id];
};

Map.prototype.removeImage = function removeImage(id) {
  delete this._images[id];
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
  this.getLngLat = jest.fn(() => this);

  this.addTo = jest.fn((map) => {
    if (!map) {
      throw new Error();
    }

    return this;
  });

  this.setDOMContent = jest.fn(() => this);
  this.remove = jest.fn();

  return this;
}

Popup.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

function Marker() {
  this.setLngLat = jest.fn(() => this);
  this.getLngLat = jest.fn(() => this);

  this.addTo = jest.fn((map) => {
    if (!map) {
      throw new Error();
    }

    return this;
  });

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

GeolocateControl.prototype.on = function on(listener, fn) {
  fn({ target: this });
};

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
