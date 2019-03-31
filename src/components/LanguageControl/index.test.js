/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { LanguageControl } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <LanguageControl />
    </MapGL>
  );

  expect(wrapper.find('LanguageControl').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('LanguageControl').exists()).toBe(false);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() => mount(<LanguageControl />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
