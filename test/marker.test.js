import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapGL, { Marker } from '../src';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('mapbox-gl');

test('Marker#render', () => {
  const Element = <div>ok</div>;

  const wrapper = mount((
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Marker longitude={0} latitude={0} element={Element} />
    </MapGL>));

  expect(wrapper.find('Marker').exists()).toBe(true);
});
