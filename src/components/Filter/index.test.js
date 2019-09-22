/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Filter, Layer } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Layer id="points" />
      <Filter layerId="noSuchLayer" filter={['==', 'foo', 123]} />
      <Filter layerId="points" filter={['==', 'foo', 123]} />
    </MapGL>
  );

  expect(wrapper.find('Filter').exists()).toBe(true);
  wrapper.setProps({
    children: [
      <Layer id="points" />,
      <Filter layerId="points" filter={['==', 'foo', 456]} />
    ]
  });

  wrapper.unmount();
  expect(wrapper.find('Image').exists()).toBe(false);
});
