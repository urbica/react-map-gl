import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source } from '../..';

test('render geojson source', () => {
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

test('update geojson source', () => {
  const data1 = { type: 'FeatureCollection', features: [] };
  const data2 = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data1} />
    </MapGL>
  );

  wrapper.setProps({
    children: <Source id="test" type="geojson" data={data2} />
  });
});

test('render vector source', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="vector" url="mapbox://mapbox.mapbox-terrain-v2" />
    </MapGL>
  );

  expect(wrapper.find('Source').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Source').exists()).toBe(false);
});

test('update vector source', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="vector" url="mapbox://styles/mapbox/light-v9" />
    </MapGL>
  );

  wrapper.setProps({
    children: (
      <Source id="test" type="vector" url="mapbox://styles/mapbox/dark-v9" />
    )
  });
});

test('remove and add new source', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
    </MapGL>
  );

  wrapper.setProps({
    children: (
      <Source id="test" type="vector" url="mapbox://mapbox.mapbox-terrain-v2" />
    )
  });
});
