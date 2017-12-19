import { fromJS } from 'immutable';
import diff from '../../src/utils/diff';

test('diff#undefined', () => {
  expect(diff(undefined, undefined)).toEqual([]);
});

test('diff#empty', () => {
  const prevMap = fromJS();
  const newMap = fromJS();

  expect(diff(newMap, prevMap)).toEqual([]);
});

test('diff#add', () => {
  const prevMap = fromJS({ a: 1, b: 2 });
  const newMap = fromJS({
    a: 1,
    b: 2,
    c: 3,
    d: 4
  });

  expect(diff(newMap, prevMap)).toEqual([['c', 3], ['d', 4]]);
});

test('diff#remove', () => {
  const prevMap = fromJS({ a: 1, b: 2 });
  const newMap = fromJS();

  expect(diff(newMap, prevMap)).toEqual([['a', undefined], ['b', undefined]]);
});

test('diff#override', () => {
  const prevMap = fromJS({ a: 1, b: 2 });
  const newMap = fromJS({ a: 3, b: 4 });

  expect(diff(newMap, prevMap)).toEqual([['a', 3], ['b', 4]]);
});

test('diff#nested', () => {
  const prevMap = fromJS({ a: 1, b: { c: 2 } });
  const newMap = fromJS({ a: 1, b: { c: 3 } });

  expect(diff(newMap, prevMap)).toEqual([['b', fromJS({ c: 3 })]]);
});
