import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, FeatureState } from '../..';

test('FeatureState#render', () => {
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

test('FeatureState#update', () => {
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
