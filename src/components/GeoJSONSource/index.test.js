import React from 'react';
import { mount } from 'enzyme';
import MapGL, { GeoJSONSource } from '../..';

test('GeoJSONSource#render', () => {
  const data = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-7.3828125, 12.554563528593656],
              [105.8203125, 12.554563528593656],
              [105.8203125, 68.26938680456564],
              [-7.3828125, 68.26938680456564],
              [-7.3828125, 12.554563528593656]
            ]
          ]
        }
      }
    ]
  };

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <GeoJSONSource id="test" data={data} />
    </MapGL>
  );

  expect(wrapper.find('GeoJSONSource').exists()).toBe(true);

  wrapper.unmount();
  expect(wrapper.find('GeoJSONSource').exists()).toBe(false);
});
