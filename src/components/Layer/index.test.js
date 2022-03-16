/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Source, Layer } from '../..';

test('Layer#render', () => {
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

test('Layer#unmount', () => {
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

  const map = wrapper.instance().getMap();
  expect(map.getLayer('test')).toBeTruthy();

  wrapper.setProps({
    children: [<Source id="test" type="geojson" data={data} />]
  });

  expect(map.getLayer('test')).toBeFalsy();
});

test('update id', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test" />
    </MapGL>
  );

  const map = wrapper.instance().getMap();
  expect(map.getLayer('test1')).toBeTruthy();

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test2" type="circle" source="test" />
    ]
  });

  expect(map.getLayer('test1')).toBeFalsy();
  expect(map.getLayer('test2')).toBeTruthy();
});

test('update type', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test" type="circle" source="test" />
    </MapGL>
  );

  const map = wrapper.instance().getMap();
  expect(map.getLayer('test').type).toEqual('circle');

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test" type="line" source="test" />
    ]
  });

  expect(map.getLayer('test').type).toEqual('line');
});

test('update source and source-layer', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test1" type="geojson" data={data} />
      <Layer id="test" type="circle" source="test1" source-layer="test1" />
    </MapGL>
  );

  const map = wrapper.instance().getMap();
  const layer1 = map.getLayer('test');
  expect(layer1.source).toEqual('test1');
  expect(layer1['source-layer']).toEqual('test1');

  wrapper.setProps({
    children: [
      <Source id="test2" type="geojson" data={data} />,
      <Layer id="test" type="circle" source="test2" source-layer="test2" />
    ]
  });

  const layer2 = map.getLayer('test');
  expect(layer2.source).toEqual('test2');
  expect(layer2['source-layer']).toEqual('test2');
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
        onContextMenu={handler}
      />
    ]
  });

  expect(handler).toHaveBeenCalledTimes(5);

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      <Layer id="test1" type="circle" source="test" />
    ]
  });

  expect(handler).toHaveBeenCalledTimes(5);

  // wrapper.setProps({ children: [] });
});

test('throws', () => {
  console.error = jest.fn();

  expect(() =>
    mount(<Layer id="test" type="circle" source="test" />)
  ).toThrow();

  expect(console.error).toHaveBeenCalled();
});
