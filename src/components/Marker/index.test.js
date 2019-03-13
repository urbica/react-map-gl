/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Marker } from '../..';

const Element = <div>ok</div>;
test('render', () => {
  const onDragEnd = jest.fn();

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Marker
        longitude={0}
        latitude={0}
        element={Element}
        onDragEnd={onDragEnd}
      />
    </MapGL>
  );

  const MarkerWrapper = wrapper.find('Marker');
  expect(MarkerWrapper.exists()).toBe(true);
  const marker = MarkerWrapper.instance().getMarker();
  expect(marker).toBeTruthy();

  wrapper.unmount();
  expect(wrapper.find('Marker').exists()).toBe(false);
});

test('update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Marker longitude={0} latitude={0} element={Element} />
    </MapGL>
  );

  wrapper.setProps({
    children: <Marker longitude={1} latitude={0} element={Element} />
  });

  wrapper.setProps({
    children: <Marker longitude={1} latitude={1} element={Element} />
  });
});

test.skip('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(<Marker longitude={0} latitude={0} element={Element} />)
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
