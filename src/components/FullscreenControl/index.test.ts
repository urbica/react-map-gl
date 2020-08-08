/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { FullscreenControl } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <FullscreenControl position="top-right" />
    </MapGL>
  );

  const control = wrapper.find('FullscreenControl');
  expect(control.exists()).toBe(true);
  expect(control.instance().getControl()).toBeTruthy();

  wrapper.unmount();
  expect(wrapper.find('FullscreenControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<FullscreenControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
