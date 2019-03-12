import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Popup } from '../..';

test('Popup#render', () => {
  const onClose = jest.fn();

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Popup longitude={0} latitude={0} onClose={onClose}>
        Content
      </Popup>
    </MapGL>
  );

  expect(wrapper.find('Popup').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Popup').exists()).toBe(false);
});

test('Popup#update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Popup longitude={0} latitude={0}>
        Content
      </Popup>
    </MapGL>
  );

  wrapper.setProps({
    children: (
      <Popup longitude={1} latitude={0}>
        Content
      </Popup>
    )
  });

  wrapper.setProps({
    children: (
      <Popup longitude={1} latitude={1}>
        Content
      </Popup>
    )
  });
});
