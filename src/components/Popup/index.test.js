import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Popup } from '../..';

test('Popup#render', () => {
  const Element = (
    <div>
ok
    </div>
);

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Popup longitude={0} latitude={0} element={Element} />
    </MapGL>
  );

  expect(wrapper.find('Popup').exists()).toBe(true);
});
