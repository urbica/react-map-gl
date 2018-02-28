// @flow

import Immutable from 'immutable';
import type Map from 'mapbox-gl/src/ui/map';
import type { MapMouseEvent, MapTouchEvent } from 'mapbox-gl/src/ui/events';

export type MapboxMap = Map;

export type MapboxLayer = LayerSpecification;

export type { MapMouseEvent, MapTouchEvent };

export type MapStyle = {
  toJS: () => StyleSpecification
} & Immutable.Map<string, any>;

export type MapSource = {
  toJS: () => SourceSpecification
} & Immutable.Map<string, any>;

export type MapLayer = {
  toJS: () => LayerSpecification
} & Immutable.Map<string, any>;

export type Viewport = {
  latitude: number,
  longitude: number,
  zoom: number,
  pitch?: number,
  bearing?: number
};

export type ViewportChangeEvent = MapMouseEvent | MapTouchEvent;
