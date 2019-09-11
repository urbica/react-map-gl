/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { TrafficControl, Layer } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Layer id="road" source-layer="road" />
      <TrafficControl showTraffic={false} showTrafficButton={false} />
    </MapGL>
  );

  const control = wrapper.find('TrafficControl');
  expect(control.exists()).toBe(true);
  expect(control.instance().getControl()).toBeTruthy();
  wrapper.setProps({
    children: [<TrafficControl showTraffic showTrafficButton={false} />]
  });
  wrapper.setProps({
    children: [<TrafficControl showTraffic={false} showTrafficButton />]
  });

  wrapper.unmount();
  expect(wrapper.find('TrafficControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<TrafficControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
