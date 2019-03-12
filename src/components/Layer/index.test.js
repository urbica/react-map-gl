import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, Layer } from '../..';

test('Layer#render', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test" type="circle" source="test" />
    </MapGL>
  );

  expect(wrapper.find('Layer').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('Layer').exists()).toBe(false);
});

test('Layer#before', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test" />
      <Layer id="test3" type="circle" source="test" />
      <Layer id="test2" type="circle" source="test" before="test3" />
    </MapGL>
  );

  expect(wrapper.find('Layer').exists()).toBe(true);
  expect(wrapper.find('Layer')).toHaveLength(3);

  wrapper.unmount();
  expect(wrapper.find('Layer').exists()).toBe(false);
});

test('Layer#update', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test" />
      <Layer id="test2" type="circle" source="test" />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test1" type="circle" source="test" />,
      <Layer
        id="test2"
        before="test1"
        type="circle"
        source="test"
        layout={{ visibility: 'visible' }}
        paint={{ 'circle-color': '#000' }}
        filter={['==', 'id', 0]}
      />
    ]
  });
});

test('Layer#handlers', () => {
  const data = { type: 'FeatureCollection', features: [] };
  const handler = jest.fn();

  mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer
        id="test1"
        type="circle"
        source="test"
        onClick={handler}
        onHover={handler}
        onEnter={handler}
        onLeave={handler}
      />
    </MapGL>
  );

  expect(handler).toHaveBeenCalledTimes(4);
});
