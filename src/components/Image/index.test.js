/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Image } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Image id="test" image="test" />
      <Image id="test1" image={{}} />
    </MapGL>
  );

  expect(wrapper.find('Image').exists()).toBe(true);
  expect(wrapper.find('Image')).toHaveLength(2);

  wrapper.unmount();
  expect(wrapper.find('Image').exists()).toBe(false);
});

test('update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Image id="test" image="test" pixelRatio={1} sdf={false} />
      <Image id="test1" image={{}} />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Image id="test" image="test1" pixelRatio={3} sdf />,
      <Image id="test1" image={{}} />
    ]
  });

  wrapper.setProps({
    children: [
      <Image id="test" image="test" pixelRatio={1} sdf={false} />,
      <Image id="test1" image={{}} />
    ]
  });
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<Image id="test" image="test" />)).toThrow();

  expect(console.error).toHaveBeenCalled();
});
