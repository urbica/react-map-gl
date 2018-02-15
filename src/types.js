// @flow

import { Map } from 'immutable';
import mapboxgl from './utils/mapbox-gl';

export type MapStyle = Map<string, any>;

export type MapSource = Map<string, any>;

export type MapLayer = Map<string, any>;

export type Viewport = {
  latitude: number,
  longitude: number,
  zoom: number,
  pitch?: number,
  bearing?: number
};

export type ViewportChangeEvent = mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent;
