import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Immutable from 'immutable';
import MapGL, { Source, Layer } from '../src';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('mapbox-gl');

const source = Immutable.fromJS({
  type: 'geojson',
  data: { type: 'FeatureCollection', features: [] }
});

const layer = Immutable.fromJS({
  id: 'test',
  type: 'circle',
  source: 'test'
});

test('Layer#render', () => {
  const wrapper = mount((
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Source id="test" source={source} />
      <Layer layer={layer} />
    </MapGL>));

  expect(wrapper.find('Layer').exists()).toBe(true);
});
