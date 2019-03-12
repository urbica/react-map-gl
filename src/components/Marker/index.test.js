import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Marker } from '../..';

test('Marker#render', () => {
  const onDragEnd = jest.fn();
  const Element = <div>ok</div>;

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

  expect(wrapper.find('Marker').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Marker').exists()).toBe(false);
});

test('Marker#update', () => {
  const Element = <div>ok</div>;

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
