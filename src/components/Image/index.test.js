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
      <Image id="test" image="test" />
      <Image id="test1" image={{}} pixelRatio={1} sdf={false} />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Image id="test" image="test1" />,
      <Image id="test1" image={{}} pixelRatio={3} sdf />
    ]
  });

  wrapper.setProps({
    children: [
      <Image id="test" image="test" />,
      <Image id="test1" image={{}} pixelRatio={1} sdf={false} />
    ]
  });
});

test('throws on loadImage', () => {
  console.error = jest.fn();

  /* eslint-disable global-require */
  const mapboxgl = require('../../__mocks__/mapbox-gl');
  mapboxgl.Map.prototype.loadImage = function loadImage(url, callback) {
    callback(new Error());
  };

  jest.setMock('mapbox-gl', mapboxgl);

  expect(() =>
    mount(
      <MapGL latitude={0} longitude={0} zoom={0}>
        <Image id="test" image="will-fail" />
      </MapGL>
    )
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<Image id="test" image="test" />)).toThrow();

  expect(console.error).toHaveBeenCalled();
});
