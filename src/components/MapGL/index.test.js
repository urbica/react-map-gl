/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';

import MapGL from './index';
import { CustomLayer, Layer, Source } from '../../index';

test('render', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0} cursorStyle="pointer" />
  );

  expect(wrapper.exists()).toBe(true);
  const map = wrapper.instance().getMap();
  expect(map).toBeTruthy();

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
});

test('viewportChangeMethod throw', () => {
  console.error = jest.fn();

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0} viewportChangeMethod="jumpTo" />
  );

  expect(() => {
    wrapper.setProps({ zoom: 3, viewportChangeMethod: 'invalid' });
  }).toThrow();

  expect(console.error).toHaveBeenCalled();
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

test('children order', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test1" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test1" />
      <Source id="test2" type="geojson" data={data} />
      <Layer id="test2" type="circle" source="test2" />
      <Source id="test3" type="geojson" data={data} />
      <Layer id="test3" type="circle" source="test3" />
    </MapGL>
  );

  const children = wrapper.find('div');
  expect(children.childAt(0).type()).toBe(Source);
  expect(children.childAt(1).type()).toBe(Layer);
  expect(children.childAt(2).type()).toBe(Source);
  expect(children.childAt(3).type()).toBe(Layer);
  expect(children.childAt(4).type()).toBe(Source);
  expect(children.childAt(5).type()).toBe(Layer);
});

test('layers ordering', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test1" type="geojson" data={data} />
      <Layer id="test1" type="circle" source="test1" />
      <Source id="test2" type="geojson" data={data} />
      <Layer id="test2" type="circle" source="test2" />
      <Source id="test3" type="geojson" data={data} />
      <Layer id="test3" type="circle" source="test3" />
    </MapGL>
  );

  const layersWrapper = wrapper.find('Layer');
  expect(layersWrapper.find({ id: 'test1' }).props().before).toBe('test2');
  expect(layersWrapper.find({ id: 'test2' }).props().before).toBe('test3');
  expect(layersWrapper.find({ id: 'test3' }).props().before).toBe(undefined);
});

test('layers reordering', () => {
  const data = { type: 'FeatureCollection', features: [] };

  const layers = [
    {
      id: 'test1',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test2',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test3',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test4',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test5',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test6',
      type: 'circle',
      source: 'test'
    }
  ];

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" type="geojson" data={data} />
      {layers.map(layer => (
        <Layer
          key={layer.id}
          id={layer.id}
          type={layer.type}
          source={layer.source}
        />
      ))}
    </MapGL>
  );

  const map = wrapper.instance().getMap();
  const style = map.getStyle();
  expect(style.layers).toEqual(layers);

  const layersWrapper = wrapper.find('Layer');
  expect(layersWrapper.find({ id: 'test1' }).props().before).toBe('test2');
  expect(layersWrapper.find({ id: 'test2' }).props().before).toBe('test3');
  expect(layersWrapper.find({ id: 'test3' }).props().before).toBe('test4');
  expect(layersWrapper.find({ id: 'test4' }).props().before).toBe('test5');
  expect(layersWrapper.find({ id: 'test5' }).props().before).toBe('test6');
  expect(layersWrapper.find({ id: 'test6' }).props().before).toBe(undefined);

  const layers2 = [
    {
      id: 'test6',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test5',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test4',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test3',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test2',
      type: 'circle',
      source: 'test'
    },
    {
      id: 'test1',
      type: 'circle',
      source: 'test'
    }
  ];

  wrapper.setProps({
    children: [
      <Source id="test" type="geojson" data={data} />,
      ...layers2.map(layer => (
        <Layer
          key={layer.id}
          id={layer.id}
          type={layer.type}
          source={layer.source}
        />
      ))
    ]
  });

  const style2 = map.getStyle();
  expect(style2.layers).toEqual(layers2);

  const layersWrapper2 = wrapper.find('Layer');
  expect(layersWrapper2.find({ id: 'test6' }).props().before).toBe('test5');
  expect(layersWrapper2.find({ id: 'test5' }).props().before).toBe('test4');
  expect(layersWrapper2.find({ id: 'test4' }).props().before).toBe('test3');
  expect(layersWrapper2.find({ id: 'test3' }).props().before).toBe('test2');
  expect(layersWrapper2.find({ id: 'test2' }).props().before).toBe('test1');
  expect(layersWrapper2.find({ id: 'test1' }).props().before).toBe(undefined);
});

test('normalizeChildren', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Layer id="layer1" />
      <Layer id="layer2" />
      <Layer id="layer3" />
      {null}
      <Source id="source1" type="vector">
        <Layer id="layer4" />
        {null}
        <Layer id="layer5" />
      </Source>
      {null}
      <CustomLayer layer={{ id: 'layer6' }} />
      <React.Fragment>
        <Layer id="layer7" />
        {null}
        <Layer id="layer8" />
      </React.Fragment>
      <Layer id="layer0" before="layer1" />
      {null}
      <Source id="source2" type="vector">
        <Layer id="layer9" />
        <Layer id="layer10" />
      </Source>
    </MapGL>
  );

  const layersWrapper = wrapper.find('Layer');
  expect(layersWrapper.find({ id: 'layer1' }).props().before).toBe('layer2');
  expect(layersWrapper.find({ id: 'layer2' }).props().before).toBe('layer3');
  expect(layersWrapper.find({ id: 'layer3' }).props().before).toBe('layer4');
  expect(layersWrapper.find({ id: 'layer4' }).props().before).toBe('layer5');
  expect(layersWrapper.find({ id: 'layer5' }).props().before).toBe('layer6');
  expect(
    wrapper
      .find('CustomLayer')
      .find({ layer: { id: 'layer6' } })
      .props().before
  ).toBe('layer7');
  expect(layersWrapper.find({ id: 'layer7' }).props().before).toBe('layer8');
  expect(layersWrapper.find({ id: 'layer8' }).props().before).toBe('layer9');
  expect(layersWrapper.find({ id: 'layer9' }).props().before).toBe('layer10');
  expect(layersWrapper.find({ id: 'layer10' }).props().before).toBe(undefined);
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

test('circular add/remove layers', () => {
  const data = { type: 'FeatureCollection', features: [] };

  class Wrapper extends React.PureComponent {
    state = {
      test1: true,
      test2: false
    };

    render() {
      return (
        <MapGL latitude={0} longitude={0} zoom={0}>
          {this.state.test1 && (
            <React.Fragment>
              <Source id="test1" type="geojson" data={data} />
              <Layer id="test1" type="circle" source="test1" />
            </React.Fragment>
          )}
          {this.state.test2 && (
            <React.Fragment>
              <Source id="test2" type="geojson" data={data} />
              <Layer id="test2" type="circle" source="test2" />
            </React.Fragment>
          )}
        </MapGL>
      );
    }
  }

  const wrapper = mount(<Wrapper />);

  expect(() => {
    wrapper.setState({ test2: true });
    wrapper.setState({ test1: false });
    wrapper.setState({ test1: true });
    wrapper.setState({ test2: false });
  }).not.toThrow();
});

test('renders with tileBoundaries', () => {
  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0} showTileBoundaries />
  );

  const map = wrapper.instance().getMap();
  expect(map.showTileBoundaries).toBe(true);

  wrapper.setProps({ showTileBoundaries: false });
  expect(map.showTileBoundaries).toBe(false);
});

test('do not call onViewportChange if originalEvent is not present', () => {
  /* eslint-disable global-require */
  const mapboxgl = require('../../__mocks__/mapbox-gl');
  mapboxgl.Map.prototype.on = function on(_, listener, fn) {
    const handler = typeof listener === 'function' ? listener : fn;
    handler({ target: this, originalEvent: false, point: { x: 0, y: 0 } });
  };
  jest.setMock('mapbox-gl', mapboxgl);

  const onViewportChange = jest.fn();

  mount(
    <MapGL
      latitude={0}
      longitude={0}
      zoom={0}
      onViewportChange={onViewportChange}
    />
  );

  expect(onViewportChange).not.toHaveBeenCalled();
});

test('supports array event handlers', () => {
  const onClick = jest.fn();

  const wrapper = mount(
    <MapGL
      latitude={0}
      longitude={0}
      zoom={0}
      onClick={['national_park', onClick]}
    />
  );

  expect(wrapper.exists()).toBe(true);
});

test('renders without mapbox-gl', () => {
  jest.resetModules();
  jest.doMock('mapbox-gl', () => null);

  /* eslint-disable no-shadow, global-require */
  const MapGL = require('.').default;

  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);

  expect(wrapper.exists()).toBe(true);
  const map = wrapper.instance().getMap();
  expect(map).toBeFalsy();
});
