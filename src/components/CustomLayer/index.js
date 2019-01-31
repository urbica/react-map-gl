// @flow

import { PureComponent, createElement } from 'react';
import MapContext from '../MapContext';

type Props = {
  /** The id of an existing layer to insert the new layer before. */
  before?: string,

  /** Mapbox GL Custom Layer instance */
  layer: MapCustomLayer
};

/**
 * Custom layers allow a user to render directly into the map's GL context
 * using the map's camera.
 */
class CustomLayer extends PureComponent<Props> {
  _id: string;

  _map: MapboxMap;

  _layer: MapCustomLayer;

  static displayName = 'CustomLayer';

  componentDidMount() {
    const map: MapboxMap = this._map;
    const { layer, before } = this.props;

    if (before && map.getLayer(before)) {
      map.addLayer(layer, before);
    } else {
      map.addLayer(layer);
    }

    this._id = layer.id;
    this._layer = layer;
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    if (this._map.getLayer(this._id)) {
      this._map.removeLayer(this._id);
    }
  }

  /**
   * External apps can access layer this way
   */
  getLayer() {
    return this._layer;
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default CustomLayer;
