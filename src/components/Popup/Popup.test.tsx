/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Popup } from '../..';

test('render', () => {
  const onClose = jest.fn();

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Popup longitude={0} latitude={0} onClose={onClose}>
        Content
      </Popup>
    </MapGL>
  );

  const PopupWrapper = wrapper.find('Popup');
  expect(PopupWrapper.exists()).toBe(true);
  const popup = PopupWrapper.instance().getPopup();
  expect(popup).toBeTruthy();

  wrapper.unmount();
  expect(wrapper.find('Popup').exists()).toBe(false);
});

test('update', () => {
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

test('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(
      <Popup longitude={0} latitude={0}>
        Content
      </Popup>
    )
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
