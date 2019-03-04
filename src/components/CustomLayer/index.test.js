import React from 'react';
import { mount } from 'enzyme';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import MapGL, { CustomLayer } from '../..';

test('CustomLayer#render', () => {
  const myDeckLayer = new MapboxLayer({
    id: 'my-scatterplot',
    type: ScatterplotLayer,
    data: [{ position: [-74.5, 40], size: 1000 }],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [255, 0, 0]
  });

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <CustomLayer layer={myDeckLayer} />
    </MapGL>
  );

  expect(wrapper.find('CustomLayer').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('CustomLayer').exists()).toBe(false);
});
