import React from 'react';
import { shallow } from 'enzyme';
import shallowCompareChildren from './shallowCompareChildren';

test('shallowCompareChildren#undefined', () => {
  const prevChildren = shallow(<ul />)
    .find('ul')
    .children();

  const newChildren = shallow(<ul />)
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(true);
});

test('diff#one-1', () => {
  const prevChildren = shallow(
    <ul>
      <li key="1" />
    </ul>
  )
    .find('ul')
    .children();

  const newChildren = shallow(
    <ul>
      <li key="1" />
    </ul>
  )
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(true);
});

test('diff#one-2', () => {
  const prevChildren = shallow(
    <ul>
      <li key="1" />
    </ul>
  )
    .find('ul')
    .children();

  const newChildren = shallow(
    <ul>
      <li key="2" />
    </ul>
  )
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(false);
});

test('diff#multiple-1', () => {
  const prevChildren = shallow(
    <ul>
      <li key="1" />
      <li key="2" />
      <li key="3" />
    </ul>
  )
    .find('ul')
    .children();

  const newChildren = shallow(
    <ul>
      <li key="1" />
      <li key="2" />
      <li key="3" />
    </ul>
  )
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(true);
});

test('diff#multiple-2', () => {
  const prevChildren = shallow(
    <ul>
      <li key="1" />
      <li key="2" />
      <li key="3" />
    </ul>
  )
    .find('ul')
    .children();

  const newChildren = shallow(
    <ul>
      <li key="2" />
      <li key="3" />
      <li key="4" />
    </ul>
  )
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(false);
});

test('diff#different-count', () => {
  const prevChildren = shallow(
    <ul>
      <li key="1" />
    </ul>
  )
    .find('ul')
    .children();

  const newChildren = shallow(
    <ul>
      <li key="1" />
      <li key="2" />
    </ul>
  )
    .find('ul')
    .children();

  expect(shallowCompareChildren(prevChildren, newChildren)).toEqual(false);
});
