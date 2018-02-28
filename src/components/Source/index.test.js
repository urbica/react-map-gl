import React from 'react';
import { mount } from 'enzyme';
import Immutable from 'immutable';
import MapGL, { Source } from '../../';

const source = Immutable.fromJS({
  type: 'geojson',
  data: { type: 'FeatureCollection', features: [] }
});

test('Source#render', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0}>
    <Source id="test" source={source} />
                        </MapGL>);

  expect(wrapper.find('Source').exists()).toBe(true);
});
