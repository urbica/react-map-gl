import React from 'react';
import { mount } from 'enzyme';
import MapGL, { Cluster, Marker } from '../..';

test('Cluster#render', () => {
  const Element = () => <div>ok</div>;
  const ClusterComponent = () => <div>ok</div>;

  const wrapper = mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <Cluster component={ClusterComponent}>
        <Marker longitude={0} latitude={0}>
          <Element />
        </Marker>
        <Marker longitude={1} latitude={1}>
          <Element />
        </Marker>
        <Marker longitude={2} latitude={2}>
          <Element />
        </Marker>
      </Cluster>
    </MapGL>
  );

  expect(wrapper.find('Cluster').exists()).toBe(true);
  expect(wrapper.find('ClusterComponent').exists()).toBe(true);
  expect(wrapper.find('ClusterComponent')).toHaveLength(1);
});
