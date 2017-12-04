import React from 'react';
import { mount } from 'enzyme';
import MapGL from '../src';

test('MapGL#render', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);
  expect(wrapper.exists()).toBe(true);
});

test('MapGL#onLoad', () => {
  const onLoad = jest.fn();
  mount(<MapGL latitude={0} longitude={0} zoom={0} onLoad={onLoad} />);
  expect(onLoad).toHaveBeenCalled();
});

// test('MapGL#onViewportChange', () => {
//   const onViewportChange = jest.fn();
//   mount(<MapGL
//     latitude={0}
//     longitude={0}
//     zoom={0}
//     onViewportChange={onViewportChange}
//   />);
//   expect(onViewportChange).toHaveBeenCalled();
// });
