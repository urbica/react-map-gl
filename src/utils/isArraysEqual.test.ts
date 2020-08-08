import isArraysEqual from './isArraysEqual';

test('isArraysEqual#empty', () => {
  expect(isArraysEqual([], [])).toEqual(true);
});

test('isArraysEqual#length', () => {
  expect(isArraysEqual(['test1'], ['test1', 'test2'])).toEqual(false);
});

test('isArraysEqual#equal', () => {
  expect(isArraysEqual(['test'], ['test'])).toEqual(true);
});

test('isArraysEqual#equal2', () => {
  expect(isArraysEqual(['test1', 'test2'], ['test1', 'test2'])).toEqual(true);
});

test('isArraysEqual#notEqual', () => {
  expect(isArraysEqual(['test1'], ['test2'])).toEqual(false);
});

test('isArraysEqual#notEqual2', () => {
  expect(isArraysEqual(['test1', 'test1'], ['test1', 'test2'])).toEqual(false);
});
