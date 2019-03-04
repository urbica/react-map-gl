// @flow

const point = (
  coordinates: [number, number],
  properties: { [string]: any } = {}
) => ({
  type: 'Feature',
  properties,
  geometry: {
    type: 'Point',
    coordinates
  }
});

export default point;
