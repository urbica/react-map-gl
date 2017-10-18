// @flow

import { Map } from 'immutable';

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
