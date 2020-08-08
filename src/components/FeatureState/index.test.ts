/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, FeatureState } from '../..';

test('render', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <FeatureState id="test" source="test" />
    </MapGL>
  );

  expect(wrapper.find('FeatureState').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('FeatureState').exists()).toBe(false);
});

test('update', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <FeatureState id="test" source="test" state={{ hover: false }} />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <FeatureState id="test" source="test" state={{ hover: true }} />
    ]
  });
});

test('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(<FeatureState id="test" source="test" state={{}} />)
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
