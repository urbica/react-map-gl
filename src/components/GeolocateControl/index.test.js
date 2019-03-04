import React from 'react';
import { mount } from 'enzyme';
import MapGL, { GeolocateControl } from '../..';

test('GeolocateControl#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <GeolocateControl position="top-right" />
    </MapGL>
  );

  expect(wrapper.find('GeolocateControl').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('GeolocateControl').exists()).toBe(false);
});
