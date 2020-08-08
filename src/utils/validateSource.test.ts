import validateSource from './validateSource';

const types = ['vector', 'raster', 'raster-dem', 'geojson', 'video', 'image'];

test('validate source', () => {
  types.forEach((type) => {
    const source = { type };
    expect(validateSource(source).type).toEqual(type);
  });

  expect(() => validateSource({ type: 'invalid' })).toThrow();
});
