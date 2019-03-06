import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source } from '../..';

test('GeoJSONSource#render', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
    </MapGL>
  );

  expect(wrapper.find('Source').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Source').exists()).toBe(false);
});

test('VectorSource#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="vector" url="mapbox://mapbox.mapbox-terrain-v2" />
    </MapGL>
  );

  expect(wrapper.find('Source').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Source').exists()).toBe(false);
});
