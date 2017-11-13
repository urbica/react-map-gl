function mockMap() {
  this.on = jest.fn((_, fn) => fn({ target: this }));
  this.once = jest.fn((_, fn) => fn({ target: this }));
  this.flyTo = jest.fn();
  this.getCanvas = jest.fn();
  this.getCenter = jest.fn(() => ({ lat: 0, lng: 0 }));
  this.getBearing = jest.fn(() => 0);
  this.getPitch = jest.fn(() => 0);
  this.getZoom = jest.fn(() => 0);

  return this;
}

module.exports = {
  Map: mockMap,
  supported: () => true
};
