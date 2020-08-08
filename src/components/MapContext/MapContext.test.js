/* eslint-disable no-console */

import React from 'react';
import { mount } from 'enzyme';

import MapGL, { MapContext } from '../..';

test('MapContext#render', () => {
  mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <MapContext.Consumer>
        {(map) => {
          expect(map).toBeTruthy();
          return null;
        }}
      </MapContext.Consumer>
    </MapGL>
  );
});
