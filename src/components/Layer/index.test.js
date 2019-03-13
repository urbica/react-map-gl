/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, Layer } from '../..';

test('render', () => {
  const handler = jest.fn();
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer
        id="test"
        type="circle"
        source="test"
        onClick={handler}
        onHover={handler}
        onEnter={handler}
        onLeave={handler}
      />
    </MapGL>
  );

  expect(wrapper.find('Layer').exists()).toBe(true);
  expect(handler).toHaveBeenCalledTimes(4);

  wrapper.unmount();
  expect(wrapper.find('Layer').exists()).toBe(false);
});

test('before', () => {
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

test('update', () => {
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

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test1" type="circle" source="test" />,
      <Layer id="test2" type="circle" source="test" />
    ]
  });
});

test('handlers', () => {
  const data = { type: 'FeatureCollection', features: [] };
  const handler = jest.fn();

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test" />
    </MapGL>
  );

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer
        id="test1"
        type="circle"
        source="test"
        onClick={handler}
        onHover={handler}
        onEnter={handler}
        onLeave={handler}
      />
    ]
  });

  expect(handler).toHaveBeenCalledTimes(4);

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test1" type="circle" source="test" />
    ]
  });

  expect(handler).toHaveBeenCalledTimes(4);
});

test('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(<Layer id="test" type="circle" source="test" />)
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
