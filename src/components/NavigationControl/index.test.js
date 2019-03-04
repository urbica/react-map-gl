import React from 'react';
import { mount } from 'enzyme';
import MapGL, { NavigationControl } from '../..';

test('NavigationControl#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <NavigationControl showCompass showZoom position="top-right" />
    </MapGL>
  );

  expect(wrapper.find('NavigationControl').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('NavigationControl').exists()).toBe(false);
});
