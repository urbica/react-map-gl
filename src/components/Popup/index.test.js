import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Popup } from '../..';

test('Popup#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Popup longitude={0} latitude={0}>
        Content
      </Popup>
    </MapGL>
  );

  expect(wrapper.find('Popup').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Popup').exists()).toBe(false);
});
