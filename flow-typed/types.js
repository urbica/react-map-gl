// @flow

import type Map from 'mapbox-gl/src/ui/map';
import type Popup from 'mapbox-gl/src/ui/popup';
import type Marker from 'mapbox-gl/src/ui/marker';
import type NavigationControl from 'mapbox-gl/src/ui/control/navigation_control';
import type { Map as ImmutableMap } from 'immutable';
import type { MapMouseEvent, MapTouchEvent } from 'mapbox-gl/src/ui/events';

import type {
  LayerSpecification,
  StyleSpecification,
  SourceSpecification
} from 'mapbox-gl/src/style-spec/types';

import type { LngLatBoundsLike } from 'mapbox-gl/src/geo/lng_lat_bounds';

declare type MapboxMap = Map;

declare type MapboxPopup = Popup;

declare type MapboxMarker = Marker;

declare type MapboxNavigationControl = NavigationControl;

declare type MapboxLngLatBoundsLike = LngLatBoundsLike;

declare type MapboxLayerSpecification = LayerSpecification;

declare type MapboxStyleSpecification = StyleSpecification;

declare type MapboxSourceSpecification = SourceSpecification;

declare type MapboxGL = {
  Map: MapboxMap,
  Popup: MapboxPopup,
  Marker: MapboxMarker
};

declare type MapStyle = {
  toJS: () => StyleSpecification
} & ImmutableMap<string, any>;

declare type MapSource = {
  toJS: () => SourceSpecification
} & ImmutableMap<string, any>;

declare type MapLayer = {
  toJS: () => LayerSpecification
} & ImmutableMap<string, any>;

declare type Viewport = {
  latitude: number,
  longitude: number,
  zoom: number,
  pitch?: number,
  bearing?: number
};

declare type ViewportChangeEvent = MapMouseEvent | MapTouchEvent;
