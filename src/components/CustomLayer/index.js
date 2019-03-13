// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { CustomLayerInterface } from 'mapbox-gl/src/style/style_layer/custom_style_layer';

import MapContext from '../MapContext';

type Props = {
  /** The id of an existing layer to insert the new layer before. */
  before?: string,

  /** Mapbox GL Custom Layer instance */
  layer: CustomLayerInterface
};

/**
 * Custom layers allow a user to render directly into the map's GL context
 * using the map's camera.
 */
class CustomLayer extends PureComponent<Props> {
  _id: string;

  _map: MapboxMap;

  static displayName = 'CustomLayer';

  componentDidMount() {
    const { layer, before } = this.props;

    if (before && this._map.getLayer(before)) {
      this._map.addLayer(layer, before);
    } else {
      this._map.addLayer(layer);
    }

    this._id = layer.id;
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle() || !this._map.getLayer(this._id)) {
      return;
    }

    this._map.removeLayer(this._id);
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
