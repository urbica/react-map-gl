import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Marker } from '../../';

test('Marker#render', () => {
  const Element = <div>ok</div>;

  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0}>
    <Marker longitude={0} latitude={0} element={Element} />
                        </MapGL>);

  expect(wrapper.find('Marker').exists()).toBe(true);
});
