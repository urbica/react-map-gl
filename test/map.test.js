import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MapGL from '../src';

Enzyme.configure({ adapter: new Adapter() });

const mockOn = jest.fn();
const mockOnce = jest.fn();
const mockFlyTo = jest.fn();
const mockGetCanvas = jest.fn();
const mockGetCenter = jest.fn(() => ({ lat: 0, lng: 0 }));
const mockGetBearing = jest.fn(() => 0);
const mockGetPitch = jest.fn(() => 0);
const mockGetZoom = jest.fn(() => 0);

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: mockOn,
    once: mockOnce,
    flyTo: mockFlyTo,
    getCanvas: mockGetCanvas,
    getCenter: mockGetCenter,
    getBearing: mockGetBearing,
    getPitch: mockGetPitch,
    getZoom: mockGetZoom
  })),
  supported: () => true
}));

test('MapGL#render', () => {
  const wrapper = mount(<MapGL latitude={0} longitude={0} zoom={0} />);
  expect(wrapper.exists()).toBe(true);
});

test('MapGL#onLoad', () => {
  const onLoad = jest.fn();
  mount(<MapGL latitude={0} longitude={0} zoom={0} onLoad={onLoad} />);
  expect(mockOnce).toHaveBeenCalledWith('load', onLoad);
});
