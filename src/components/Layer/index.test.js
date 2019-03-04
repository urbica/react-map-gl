import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, Layer } from '../..';

const source = {
  type: 'geojson',
  data: { type: 'FeatureCollection', features: [] }
};

const layer = {
  id: 'test',
  type: 'circle',
  source: 'test'
};

test('Layer#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" {...source} />
      <Layer {...layer} />
    </MapGL>
  );

  expect(wrapper.find('Layer').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Layer').exists()).toBe(false);
});
