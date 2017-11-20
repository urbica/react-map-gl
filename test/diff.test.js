import { Map } from 'immutable';
import diff from '../src/utils/diff';

test('diff#undefined', () => {
  expect(diff(undefined, undefined)).toEqual([]);
});

test('diff#empty', () => {
  const prevMap = new Map();
  const newMap = new Map();

  expect(diff(newMap, prevMap)).toEqual([]);
});

test('diff#add', () => {
  const prevMap = new Map({ a: 1, b: 2 });
  const newMap = new Map({
    a: 1, b: 2, c: 3, d: 4
  });

  expect(diff(newMap, prevMap)).toEqual([['c', 3], ['d', 4]]);
});

test('diff#remove', () => {
  const prevMap = new Map({ a: 1, b: 2 });
  const newMap = new Map();

  expect(diff(newMap, prevMap)).toEqual([['a', undefined], ['b', undefined]]);
});

test('diff#override', () => {
  const prevMap = new Map({ a: 1, b: 2 });
  const newMap = new Map({ a: 3, b: 4 });

  expect(diff(newMap, prevMap)).toEqual([['a', 3], ['b', 4]]);
});

