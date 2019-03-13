/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { ScaleControl } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <ScaleControl unit="metric" position="bottom-right" />
    </MapGL>
  );

  expect(wrapper.find('ScaleControl').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('ScaleControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();
  expect(() => mount(<ScaleControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
