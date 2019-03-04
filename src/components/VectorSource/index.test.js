import React from 'react';
import { mount } from 'enzyme';
import MapGL, { VectorSource } from '../..';

test('VectorSource#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <VectorSource id="contour" url="mapbox://mapbox.mapbox-terrain-v2" />
    </MapGL>
  );

  expect(wrapper.find('VectorSource').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('VectorSource').exists()).toBe(false);
});
