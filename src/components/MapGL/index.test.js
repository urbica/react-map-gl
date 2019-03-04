import React from 'react';
import { mount } from 'enzyme';

import MapGL from '../..';

test('MapGL#render', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);
  const map = wrapper.instance().getMap();

  expect(wrapper.exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
  expect(map.remove).toHaveBeenCalled();
});

test('MapGL#onLoad', () => {
  const onLoad = jest.fn();
  mount(<MapGL latitude={0} longitude={0} zoom={0} onLoad={onLoad} />);
  expect(onLoad).toHaveBeenCalled();
  // expect(onLoad).toHaveBeenCalledTimes(1);
});

test('MapGL#viewport', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);

  wrapper.setProps({ latitude: 1, longitude: 2, zoom: 3 });

  expect(wrapper.props().latitude).toBe(1);
  expect(wrapper.props().longitude).toBe(2);
  expect(wrapper.props().zoom).toBe(3);
});
