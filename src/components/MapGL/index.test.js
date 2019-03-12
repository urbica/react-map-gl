import React from 'react';
import { mount } from 'enzyme';

import MapGL, { Layer, Source } from '../..';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0} cursorStyle="pointer" />
  );
  const map = wrapper.instance().getMap();

  expect(wrapper.exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.exists()).toBe(false);
  expect(map.remove).toHaveBeenCalled();
});

test('onLoad', () => {
  const onLoad = jest.fn();
  mount(<MapGL latitude={0} longitude={0} zoom={0} onLoad={onLoad} />);
  expect(onLoad).toHaveBeenCalled();
  // expect(onLoad).toHaveBeenCalledTimes(1);
});

test('onViewportChange', () => {
  const onViewportChange = jest.fn();

  mount(
    <MapGL
      latitude={0}
      longitude={0}
      zoom={0}
      onViewportChange={onViewportChange}
    />
  );

  expect(onViewportChange).toHaveBeenCalled();
  expect(onViewportChange).toHaveBeenCalledTimes(5);
});

test('viewport update', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);

  wrapper.setProps({ latitude: 1 });
  expect(wrapper.props().latitude).toBe(1);

  wrapper.setProps({ longitude: 2 });
  expect(wrapper.props().longitude).toBe(2);

  wrapper.setProps({ zoom: 3 });
  expect(wrapper.props().zoom).toBe(3);

  wrapper.setProps({ pitch: 4 });
  expect(wrapper.props().pitch).toBe(4);

  wrapper.setProps({ bearing: 5 });
  expect(wrapper.props().bearing).toBe(5);
});

test('viewportChangeMethod update', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0} viewportChangeMethod="jumpTo" />
  );

  wrapper.setProps({ zoom: 1, viewportChangeMethod: 'flyTo' });
  expect(wrapper.props().viewportChangeMethod).toBe('flyTo');

  wrapper.setProps({ zoom: 2, viewportChangeMethod: 'easeTo' });
  expect(wrapper.props().viewportChangeMethod).toBe('easeTo');

  expect(() => {
    wrapper.setProps({ zoom: 3, viewportChangeMethod: 'invalid' });
  }).toThrow();
});

test('mapStyle update', () => {
  const wrapper = mount(
    <MapGL
      mapStyle="mapbox://styles/mapbox/light-v9"
      latitude={0}
      longitude={0}
      zoom={0}
    />
  );

  wrapper.setProps({ mapStyle: 'mapbox://styles/mapbox/dark-v9' });
  expect(wrapper.props().mapStyle).toBe('mapbox://styles/mapbox/dark-v9');
});

test('multiple layers', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test" />
      <Layer id="test2" type="circle" source="test" />
    </MapGL>
  );

  expect(wrapper.find('Layer').exists()).toBe(true);
  expect(wrapper.find('Layer')).toHaveLength(2);

  wrapper.unmount();
  expect(wrapper.find('Layer').exists()).toBe(false);
});

test('multiple sources', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source
        id="test1"
        type="vector"
        url="mapbox://mapbox.mapbox-terrain-v2"
      />
      <Source id="test2" type="geojson" data={data} />
    </MapGL>
  );

  expect(wrapper.find('Source').exists()).toBe(true);
  expect(wrapper.find('Source')).toHaveLength(2);

  wrapper.unmount();
  expect(wrapper.find('Source').exists()).toBe(false);
});
