/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { AttributionControl } from '../..';

test('AttributionControl#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <AttributionControl
        compact={false}
        position="bottom-right"
        customAttribution="Custom attribution"
      />
    </MapGL>
  );

  expect(wrapper.find('AttributionControl').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('AttributionControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<AttributionControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
