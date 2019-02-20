// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { StyleSpecification, VectorSourceSpecification } from 'mapbox-gl/src/style-spec/types';

import MapContext from '../MapContext';

type Props = {|
  // $FlowFixMe
  ...VectorSourceSpecification,
  id: string
|};

class VectorSource extends PureComponent<Props> {
  _map: MapboxMap;

  static displayName = 'VectorSource';

  componentDidMount() {
    const { id, ...vectorSource } = this.props;
    const source = { type: 'vector', ...vectorSource };
    this._map.addSource(id, source);
  }

  componentDidUpdate(prevProps: Props) {
    const { id, ...vectorSource } = this.props;
    const source = { type: 'vector', ...vectorSource };

    if (id !== prevProps.id) {
      this._map.removeSource(prevProps.id);
      this._map.addSource(id, source);
      return;
    }

    if (source.tiles !== prevProps.tiles) {
      const style = this._map.getStyle();
      style.sources[id].tiles = style.tiles;
      this._map.setStyle(style);
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    const { id } = this.props;
    if (this._map.getSource(id)) {
      const style: StyleSpecification = this._map.getStyle();
      if (style.layers) {
        style.layers
          .filter(layer => layer.source && layer.source === id)
          .forEach(layer => this._map.removeLayer(layer.id));
      }

      this._map.removeSource(id);
    }
  }

  render() {
    return createElement(MapContext.Consumer, {}, (map: ?MapboxMap) => {
      if (map) {
        this._map = map;
      }
      return null;
    });
  }
}

export default VectorSource;
