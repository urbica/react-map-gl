/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, Fog } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Fog range={[0.5, 10]} color={'#ff0000'} />
    </MapGL>
  );

  expect(wrapper.find('Fog').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Fog').exists()).toBe(false);
});

test('update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Fog range={[0.5, 10]} color={'#ff0000'} />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Fog range={[0.5, 5]} color={'#ffff00'} />
    ]
  });
});

test('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(<Fog range={[0.5, 5]} color={'#ffff00'} />)
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
