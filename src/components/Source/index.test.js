import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source } from '../..';

const source = {
  type: 'geojson',
  data: { type: 'FeatureCollection', features: [] }
};

test('Source#render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" {...source} />
    </MapGL>
  );

  expect(wrapper.find('Source').exists()).toBe(true);
});
