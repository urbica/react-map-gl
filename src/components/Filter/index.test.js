/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Filter, Layer } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Layer id="test" />
      <Layer id="test2" />
      <Filter layerId="noSuchLayer" filter={['==', 'foo', 123]} />
      <Filter layerId="test" filter={['==', 'foo', 123]} />
      <Filter layerId="test2" filter={['==', 'foo', 123]} />
    </MapGL>
  );

  expect(wrapper.find('Filter').exists()).toBe(true);
  wrapper.setProps({
    children: [
      <Layer id="test" />,
      <Layer id="test2" />,
      <Filter layerId="test" filter={['==', 'foo', 456]} />,
      <Filter layerId="test2" />
    ]
  });

  wrapper.unmount();
  expect(wrapper.find('Filter').exists()).toBe(false);
});
