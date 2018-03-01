// @flow

import Immutable from 'immutable';
import type Map from 'mapbox-gl/src/ui/map';
import type { MapMouseEvent, MapTouchEvent } from 'mapbox-gl/src/ui/events';

declare type MapboxMap = Map;

declare type MapboxLayer = LayerSpecification;

declare type MapStyle = {
  toJS: () => StyleSpecification
} & Immutable.Map<string, any>;

declare type MapSource = {
  toJS: () => SourceSpecification
} & Immutable.Map<string, any>;

declare type MapLayer = {
  toJS: () => LayerSpecification
} & Immutable.Map<string, any>;

declare type Viewport = {
  latitude: number,
  longitude: number,
  zoom: number,
  pitch?: number,
  bearing?: number
};

declare type ViewportChangeEvent = MapMouseEvent | MapTouchEvent;
