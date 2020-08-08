/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { GeolocateControl } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <GeolocateControl
        position="top-right"
        onError={jest.fn()}
        onGeolocate={jest.fn()}
        onTrackUserLocationEnd={jest.fn()}
        onTrackUserLocationStart={jest.fn()}
      />
    </MapGL>
  );

  const control = wrapper.find('GeolocateControl');
  expect(control.exists()).toBe(true);
  expect(control.instance().getControl()).toBeTruthy();

  wrapper.unmount();
  expect(wrapper.find('GeolocateControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<GeolocateControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
