import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Cluster, Marker } from '../../';

test('Cluster#render', () => {
  const Element = <div>ok</div>;
  const ClusterElement = () => <div>ok</div>;

  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0}>
    <Cluster element={ClusterElement}>
      <Marker longitude={0} latitude={0} element={Element} />
      <Marker longitude={1} latitude={1} element={Element} />
      <Marker longitude={2} latitude={2} element={Element} />
    </Cluster>
                        </MapGL>);

  expect(wrapper.find('Cluster').exists()).toBe(true);
  expect(wrapper.find('Marker').exists()).toBe(true);
  expect(wrapper.find('Marker')).toHaveLength(1);
});
