import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapGL from '../src';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('mapbox-gl');

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
//   mount(<MapGL latitude={0} longitude={0} zoom={0} onViewportChange={onViewportChange} />);
//   expect(onViewportChange).toHaveBeenCalled();
// });
