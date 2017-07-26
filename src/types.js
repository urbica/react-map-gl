/* @flow */

import { Map } from 'immutable';

export type MapStyle = String | Map<any, any>;

export type SourcesDiffElement = { id: string, source: Map<any, any> };

export type SourcesDiff = {
  enter: Array<SourcesDiffElement>,
  update: Array<SourcesDiffElement>,
  exit: Array<SourcesDiffElement>
};

export type LayersDiffElement = {
  layer: Map<any, any>,
  id: string,
  before: String | null,
  enter?: Boolean
};

export type LayersDiff = {
  updates: Array<LayersDiffElement>,
  exiting: Array<LayersDiffElement>
};

export type Viewport = {
  latitude: number,
  longitude: number,
  zoom: number,
  pitch: number,
  bearing: number
};
