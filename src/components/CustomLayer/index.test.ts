/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import MapGL, { Source, Layer, CustomLayer } from '../..';

test('render', () => {
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

test('before', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const DeckLayer1 = new MapboxLayer({
    id: 'my-scatterplot-1',
    type: ScatterplotLayer,
    data: [{ position: [-74.5, 40], size: 1000 }],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [255, 0, 0]
  });

  const DeckLayer2 = new MapboxLayer({
    id: 'my-scatterplot-2',
    type: ScatterplotLayer,
    data: [{ position: [-74.5, 40], size: 1000 }],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [255, 0, 0]
  });

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <CustomLayer layer={DeckLayer1} />
      <Layer id="test" type="circle" source="test" />
      <CustomLayer layer={DeckLayer2} before="test" />
    </MapGL>
  );

  const CustomLayerWrapper = wrapper.find('CustomLayer');
  const CustomLayerWrapper1 = CustomLayerWrapper.find({ layer: DeckLayer1 });
  expect(CustomLayerWrapper1.props().before).toBe('test');

  const CustomLayerWrapper2 = CustomLayerWrapper.find({ layer: DeckLayer2 });
  expect(CustomLayerWrapper2.props().before).toBe('test');
});

test('throws', () => {
  console.error = jest.fn();

  const myDeckLayer = new MapboxLayer({
    id: 'my-scatterplot',
    type: ScatterplotLayer,
    data: [{ position: [-74.5, 40], size: 1000 }],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [255, 0, 0]
  });

  expect(() => mount(<CustomLayer layer={myDeckLayer} />)).toThrow();
  expect(console.error).toHaveBeenCalled();
});
