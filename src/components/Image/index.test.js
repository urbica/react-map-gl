/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Image } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Image id="test" image="test" />
    </MapGL>
  );

  expect(wrapper.find('Image').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Image').exists()).toBe(false);
});

test('update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Image id="test" image="test" />
    </MapGL>
  );

  wrapper.setProps({
    children: [<Image id="test" image="test1" />]
  });

  wrapper.setProps({
    children: [<Image id="test" image="test" />]
  });
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<Image id="test" image="test" />)).toThrow();

  expect(console.error).toHaveBeenCalled();
});
