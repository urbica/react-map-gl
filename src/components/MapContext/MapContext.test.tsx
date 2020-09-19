import React from 'react';
import { mount } from 'enzyme';

import { MapGL } from '../MapGL';
import { MapContext } from './MapContext';

test('MapContext#render', () => {
  mount(
    <MapGL latitude={0} longitude={0} zoom={0}>
      <MapContext.Consumer>
        {map => {
          expect(map).toBeTruthy();
          return null;
        }}
      </MapContext.Consumer>
    </MapGL>
  );
});
